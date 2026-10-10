"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteRequestForm } from "@/frontend/route-params";
import { useUserSession } from "@/tools/FrontendSession";
import { getQuoteFormInitData, createQuoteRequest } from "@/frontend/actions/QuoteRequestForm";
import { ServiceCategoryItem, ViennaDistrictItem, QuoteFormData, SubmittedQuoteReceipt, TimeSlot, SubmissionLang, CreateQuoteRequestInput } from "@/frontend/types/QuoteRequestForm";
import HeroHeader from "@/frontend/components/QuoteRequestForm/HeroHeader";
import CategorySelector from "@/frontend/components/QuoteRequestForm/CategorySelector";
import DistrictAddressPanel from "@/frontend/components/QuoteRequestForm/DistrictAddressPanel";
import TaskLaborPanel from "@/frontend/components/QuoteRequestForm/TaskLaborPanel";
import ScheduleContactPanel from "@/frontend/components/QuoteRequestForm/ScheduleContactPanel";
import LiveSpecDocket from "@/frontend/components/QuoteRequestForm/LiveSpecDocket";
export default function QuoteRequestFormPage() {
  const searchParams = useSearchParams();
  const {
    categoryKey
  } = QuoteRequestForm.getParams(searchParams as unknown as URLSearchParams);
  const userSession = useUserSession();
  const [categories, setCategories] = useState<ServiceCategoryItem[]>([]);
  const [districts, setDistricts] = useState<ViennaDistrictItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic Anchor Date (+2 days from current)
  const defaultPreferredDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  }, []);

  // Form State
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceCategoryId: "",
    districtId: "",
    street: "Zieglergasse",
    buildingNumber: "28",
    stair: "Stiege 1",
    door: "Top 12",
    taskTitle: "Altbau Interior Drywall & Plaster Renovation",
    taskDescription: "Historic apartment built in 1898 with 3.3m high ceilings. Sanding old porous lime plaster, erecting a lightweight gypsum board partition wall with rockwool insulation, and painting two coats.",
    altbauCondition: {
      masonryType: "BRICK_ALTBAU",
      ceilingHeight: "ALTBAU_HIGH_320",
      surfaceQuality: "POROUS_SANDY"
    },
    estimatedHours: 6,
    hasMaterials: false,
    isUrgent: false,
    preferredDate: defaultPreferredDate,
    preferredTimeSlot: "MORNING",
    submissionLang: "DE",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    agreedToTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<SubmittedQuoteReceipt | null>(null);
  useEffect(() => {
    let isMounted = true;
    async function loadInitData() {
      setIsLoading(true);
      try {
        const data = await getQuoteFormInitData(categoryKey || undefined);
        if (!isMounted) return;
        if (data) {
          const loadedCategories = data.categories || [];
          const loadedDistricts = data.districts || [];
          setCategories(loadedCategories);
          setDistricts(loadedDistricts);
          const preselectedCatId = data.preselectedCategoryId || (loadedCategories[0]?.id ?? "");
          const defaultDistrict = loadedDistricts.find(d => d.districtCode === "1070") || loadedDistricts[0];
          const preselectedDistId = defaultDistrict?.id ?? "";
          setFormData(prev => ({
            ...prev,
            serviceCategoryId: prev.serviceCategoryId || preselectedCatId,
            districtId: prev.districtId || preselectedDistId,
            clientName: prev.clientName || data.currentUser?.fullName || userSession.full_name || "",
            clientEmail: prev.clientEmail || data.currentUser?.email || userSession.email || "",
            clientPhone: prev.clientPhone || data.currentUser?.phone || ""
          }));
        }
      } catch (err) {
        console.error("Failed to load quote form initial data:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadInitData();
    return () => {
      isMounted = false;
    };
  }, [categoryKey, userSession.email, userSession.full_name]);

  // Active Category & District objects
  const activeCategory = useMemo(() => {
    return categories.find(c => c.id === formData.serviceCategoryId) || categories[0];
  }, [categories, formData.serviceCategoryId]);
  const activeDistrict = useMemo(() => {
    return districts.find(d => d.id === formData.districtId) || districts[0];
  }, [districts, formData.districtId]);

  // Handlers
  const handleSelectCategory = (id: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategoryId: id
    }));
  };
  const handleSelectDistrict = (id: string) => {
    setFormData(prev => ({
      ...prev,
      districtId: id
    }));
  };
  const handleChangeAddress = (field: "street" | "buildingNumber" | "stair" | "door", val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };
  const handleChangeTaskTitle = (val: string) => {
    setFormData(prev => ({
      ...prev,
      taskTitle: val
    }));
  };
  const handleChangeTaskDescription = (val: string) => {
    setFormData(prev => ({
      ...prev,
      taskDescription: val
    }));
  };
  const handleChangeAltbau = (field: keyof QuoteFormData["altbauCondition"], val: string) => {
    setFormData(prev => ({
      ...prev,
      altbauCondition: {
        ...prev.altbauCondition,
        [field]: val
      }
    }));
  };
  const handleChangeHours = (val: number) => {
    setFormData(prev => ({
      ...prev,
      estimatedHours: val
    }));
  };
  const handleToggleMaterials = () => {
    setFormData(prev => ({
      ...prev,
      hasMaterials: !prev.hasMaterials
    }));
  };
  const handleToggleUrgent = () => {
    setFormData(prev => ({
      ...prev,
      isUrgent: !prev.isUrgent
    }));
  };
  const handleChangeDate = (val: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDate: val
    }));
  };
  const handleChangeTimeSlot = (slot: TimeSlot) => {
    setFormData(prev => ({
      ...prev,
      preferredTimeSlot: slot
    }));
  };
  const handleChangeLang = (lang: SubmissionLang) => {
    setFormData(prev => ({
      ...prev,
      submissionLang: lang
    }));
  };
  const handleChangeContact = (field: "clientName" | "clientPhone" | "clientEmail", val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };
  const handleToggleTerms = () => {
    setFormData(prev => ({
      ...prev,
      agreedToTerms: !prev.agreedToTerms
    }));
  };
  const handleSubmitQuote = async () => {
    if (!activeCategory || !activeDistrict) return;
    setIsSubmitting(true);
    try {
      const addressSnippet = `${formData.street} ${formData.buildingNumber}${formData.stair ? ", " + formData.stair : ""}${formData.door ? ", " + formData.door : ""}`.trim();
      const input: CreateQuoteRequestInput = {
        serviceCategoryId: formData.serviceCategoryId || activeCategory.id,
        districtId: formData.districtId || activeDistrict.id,
        addressSnippet,
        taskTitle: formData.taskTitle,
        taskDescription: formData.taskDescription,
        estimatedHours: formData.estimatedHours,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        hasMaterials: formData.hasMaterials,
        agreedToTerms: formData.agreedToTerms,
        submissionLang: formData.submissionLang,
        isUrgent: formData.isUrgent,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail
      };
      const result = await createQuoteRequest(input);
      if (result?.receipt) {
        setSubmittedReceipt(result.receipt);
      }
    } catch (err) {
      console.error("Failed to submit quote inquiry:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    setSubmittedReceipt(null);
  };
  if (isLoading && categories.length === 0) {
    return <div className="w-full bg-background text-foreground min-h-screen">
        <HeroHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3" />
            <span>Loading quote inquiry form...</span>
          </div>
        </main>
      </div>;
  }
  if (!isLoading && categories.length === 0) {
    return <div className="w-full bg-background text-foreground min-h-screen">
        <HeroHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="text-center py-24 text-muted-foreground">
            <p>No service categories available at this moment. Please check back later.</p>
          </div>
        </main>
      </div>;
  }
  return <div className="w-full bg-background text-foreground min-h-screen">
      {/* 01 Hero Header Banner */}
      <HeroHeader />

      {/* Main Interactive Form Workspace */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Stepwise Form Sections */}
          <div className="xl:col-span-8 space-y-8 min-w-0">
            {/* Step 1: Trade Category Selector */}
            <CategorySelector categories={categories} selectedCategoryId={formData.serviceCategoryId} onSelectCategory={handleSelectCategory} />

            {/* Step 2: Vienna 23 Districts Selector & Address */}
            <DistrictAddressPanel districts={districts} selectedDistrictId={formData.districtId} onSelectDistrict={handleSelectDistrict} street={formData.street} buildingNumber={formData.buildingNumber} stair={formData.stair} door={formData.door} onChangeAddress={handleChangeAddress} />

            {/* Step 3: Task Specification & Altbau Masonry Parameters */}
            <TaskLaborPanel taskTitle={formData.taskTitle} taskDescription={formData.taskDescription} altbauCondition={formData.altbauCondition} estimatedHours={formData.estimatedHours} hasMaterials={formData.hasMaterials} isUrgent={formData.isUrgent} baselineHourlyRate={activeCategory?.baselineHourlyRate ?? 0} onChangeTitle={handleChangeTaskTitle} onChangeDescription={handleChangeTaskDescription} onChangeAltbau={handleChangeAltbau} onChangeHours={handleChangeHours} onToggleMaterials={handleToggleMaterials} onToggleUrgent={handleToggleUrgent} />

            {/* Step 4: Execution Scheduling & Client Contact Info */}
            <ScheduleContactPanel preferredDate={formData.preferredDate} preferredTimeSlot={formData.preferredTimeSlot} submissionLang={formData.submissionLang} clientName={formData.clientName} clientPhone={formData.clientPhone} clientEmail={formData.clientEmail} agreedToTerms={formData.agreedToTerms} onChangeDate={handleChangeDate} onChangeTimeSlot={handleChangeTimeSlot} onChangeLang={handleChangeLang} onChangeContact={handleChangeContact} onToggleTerms={handleToggleTerms} />
          </div>

          {/* Right Column (4 cols): Sticky Live Spec Docket */}
          <aside className="xl:col-span-4 min-w-0">
            <LiveSpecDocket category={activeCategory} district={activeDistrict} formData={formData} submittedReceipt={submittedReceipt} isSubmitting={isSubmitting} onSubmit={handleSubmitQuote} onReset={handleReset} />
          </aside>
        </div>
      </main>
    </div>;
}
