"use client";

import React from "react";
import Link from "next/link";
import { Plus, Shield, MapPin, Wrench } from "lucide-react";
export default function TrackerHeroHeader() {
  return <div data-controller-name="Tracker Page Header" className="bg-card text-card-foreground border border-border rounded-md p-6 sm:p-8 shadow-soft" data-api-unique-id='trackerheroheader-rc6d72e04ba642d6f-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6" data-api-unique-id='trackerheroheader-r36561a0db41d87d4-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
        <div className="space-y-2 max-w-2xl" data-api-unique-id='trackerheroheader-r88961b0da0e7394d-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
          <div className="flex items-center gap-2 flex-wrap" data-api-unique-id='trackerheroheader-rbc3f94df230ceb48-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground" data-api-unique-id='trackerheroheader-r83b76043d2ce5e14-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
              <Shield className="w-3.5 h-3.5" data-api-unique-id='trackerheroheader-rb5a69ffeef065da7-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader' />
              Handwerker-Auftragsbuch
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1" data-api-unique-id='trackerheroheader-r67991e2b72fe028c-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
              <MapPin className="w-3 h-3 text-primary" data-api-unique-id='trackerheroheader-r41828847cf48df2b-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader' />
              Vienna Districts 1010–1230
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground" data-api-unique-id='trackerheroheader-rf63aff64ef239dcf-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
            Customer Quotes & Order Tracking
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed" data-api-unique-id='trackerheroheader-r31c5d599d0f8553b-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
            Real-time fulfillment ledger for your residential repair and renovation projects in Vienna. Track milestone progression from initial Altbau estimate to final master craftsman sign-off.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0" data-api-unique-id='trackerheroheader-r3b6a18a4ea30e053-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
          <Link href="/dedicatedquoterequest" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-md shadow-primary hover:bg-primary/90 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='trackerheroheader-r57223af469cf5220-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
            <Plus className="w-4 h-4" data-api-unique-id='trackerheroheader-r492a6c61bb35c8b7-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader' />
            <span data-api-unique-id='trackerheroheader-r9961439e467fb4b0-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>New Quote Request</span>
          </Link>

          <Link href="/allservicescatalog" className="inline-flex items-center justify-center gap-2 bg-background text-foreground border border-border font-medium px-4 py-2.5 rounded-md hover:bg-muted transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='trackerheroheader-r2b03b1b48eb08b6d-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>
            <Wrench className="w-4 h-4 text-muted-foreground" data-api-unique-id='trackerheroheader-r930b9322147f844f-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader' />
            <span data-api-unique-id='trackerheroheader-re368d7328335024d-s490807485' data-api-unique-page-name='src/frontend/components/CustomerInquiryTracker/TrackerHeroHeader'>Browse Trades</span>
          </Link>
        </div>
      </div>
    </div>;
}