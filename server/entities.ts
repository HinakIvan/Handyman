import { PrismaClient, Prisma } from '../prisma-generated/client';
import {
  AccountUser, 
  AccountUser_uniqueKey, 
  AccountUser_without_PKs, 
  FaqItem, 
  FaqItem_uniqueKey, 
  FaqItem_without_PKs, 
  QuoteRequest, 
  QuoteRequest_uniqueKey, 
  QuoteRequest_without_PKs, 
  ServiceCategory, 
  ServiceCategory_uniqueKey, 
  ServiceCategory_without_PKs, 
  SetupChecklistItem, 
  SetupChecklistItem_uniqueKey, 
  SetupChecklistItem_without_PKs, 
  ViennaDistrict, 
  ViennaDistrict_uniqueKey, 
  ViennaDistrict_without_PKs, 
  filtered_AccountUser, 
  filtered_FaqItem, 
  filtered_QuoteRequest, 
  filtered_ServiceCategory, 
  filtered_SetupChecklistItem, 
  filtered_ViennaDistrict,
  Entities
} from './entities.type';

export const prisma = new PrismaClient();

export const default_entities: Entities = {
  accountuser: {
    /**
        * 创建accountuser记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: AccountUser): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating accountuser:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting accountuser:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_AccountUser): Promise<AccountUser[]> => {
            try {
                return await prisma.accountuser.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all accountuser:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_AccountUser
        ): Promise<AccountUser[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.accountuser.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged accountuser:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数量
        */
        Count: async (args?: filtered_AccountUser): Promise<number> => {
            try {
                return await prisma.accountuser.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting accountuser:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating accountuser:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting accountuser:`, error);
                return null;
            }
        },  },
  servicecategory: {
    /**
        * 创建servicecategory记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: ServiceCategory): Promise<ServiceCategory | null> => {
            try {
                return await prisma.servicecategory.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating servicecategory:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: ServiceCategory_uniqueKey): Promise<ServiceCategory | null> => {
            try {
                return await prisma.servicecategory.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting servicecategory:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_ServiceCategory)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_ServiceCategory): Promise<ServiceCategory[]> => {
            try {
                return await prisma.servicecategory.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all servicecategory:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_ServiceCategory)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_ServiceCategory
        ): Promise<ServiceCategory[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.servicecategory.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged servicecategory:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_ServiceCategory)
        * @returns 记录数量
        */
        Count: async (args?: filtered_ServiceCategory): Promise<number> => {
            try {
                return await prisma.servicecategory.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting servicecategory:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: ServiceCategory_uniqueKey; data: ServiceCategory_without_PKs }): Promise<ServiceCategory | null> => {
            try {
                return await prisma.servicecategory.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating servicecategory:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: ServiceCategory_uniqueKey): Promise<ServiceCategory | null> => {
            try {
                return await prisma.servicecategory.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting servicecategory:`, error);
                return null;
            }
        },  },
  viennadistrict: {
    /**
        * 创建viennadistrict记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: ViennaDistrict): Promise<ViennaDistrict | null> => {
            try {
                return await prisma.viennadistrict.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating viennadistrict:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: ViennaDistrict_uniqueKey): Promise<ViennaDistrict | null> => {
            try {
                return await prisma.viennadistrict.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting viennadistrict:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_ViennaDistrict)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_ViennaDistrict): Promise<ViennaDistrict[]> => {
            try {
                return await prisma.viennadistrict.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all viennadistrict:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_ViennaDistrict)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_ViennaDistrict
        ): Promise<ViennaDistrict[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.viennadistrict.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged viennadistrict:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_ViennaDistrict)
        * @returns 记录数量
        */
        Count: async (args?: filtered_ViennaDistrict): Promise<number> => {
            try {
                return await prisma.viennadistrict.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting viennadistrict:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: ViennaDistrict_uniqueKey; data: ViennaDistrict_without_PKs }): Promise<ViennaDistrict | null> => {
            try {
                return await prisma.viennadistrict.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating viennadistrict:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: ViennaDistrict_uniqueKey): Promise<ViennaDistrict | null> => {
            try {
                return await prisma.viennadistrict.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting viennadistrict:`, error);
                return null;
            }
        },  },
  setupchecklistitem: {
    /**
        * 创建setupchecklistitem记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: SetupChecklistItem): Promise<SetupChecklistItem | null> => {
            try {
                return await prisma.setupchecklistitem.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating setupchecklistitem:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: SetupChecklistItem_uniqueKey): Promise<SetupChecklistItem | null> => {
            try {
                return await prisma.setupchecklistitem.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting setupchecklistitem:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_SetupChecklistItem)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_SetupChecklistItem): Promise<SetupChecklistItem[]> => {
            try {
                return await prisma.setupchecklistitem.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all setupchecklistitem:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_SetupChecklistItem)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_SetupChecklistItem
        ): Promise<SetupChecklistItem[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.setupchecklistitem.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged setupchecklistitem:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_SetupChecklistItem)
        * @returns 记录数量
        */
        Count: async (args?: filtered_SetupChecklistItem): Promise<number> => {
            try {
                return await prisma.setupchecklistitem.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting setupchecklistitem:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: SetupChecklistItem_uniqueKey; data: SetupChecklistItem_without_PKs }): Promise<SetupChecklistItem | null> => {
            try {
                return await prisma.setupchecklistitem.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating setupchecklistitem:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: SetupChecklistItem_uniqueKey): Promise<SetupChecklistItem | null> => {
            try {
                return await prisma.setupchecklistitem.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting setupchecklistitem:`, error);
                return null;
            }
        },  },
  faqitem: {
    /**
        * 创建faqitem记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: FaqItem): Promise<FaqItem | null> => {
            try {
                return await prisma.faqitem.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating faqitem:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: FaqItem_uniqueKey): Promise<FaqItem | null> => {
            try {
                return await prisma.faqitem.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting faqitem:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_FaqItem)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_FaqItem): Promise<FaqItem[]> => {
            try {
                return await prisma.faqitem.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all faqitem:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_FaqItem)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_FaqItem
        ): Promise<FaqItem[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.faqitem.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged faqitem:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_FaqItem)
        * @returns 记录数量
        */
        Count: async (args?: filtered_FaqItem): Promise<number> => {
            try {
                return await prisma.faqitem.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting faqitem:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: FaqItem_uniqueKey; data: FaqItem_without_PKs }): Promise<FaqItem | null> => {
            try {
                return await prisma.faqitem.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating faqitem:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: FaqItem_uniqueKey): Promise<FaqItem | null> => {
            try {
                return await prisma.faqitem.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting faqitem:`, error);
                return null;
            }
        },  },
  quoterequest: {
    /**
        * 创建quoterequest记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: QuoteRequest): Promise<QuoteRequest | null> => {
            try {
                return await prisma.quoterequest.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating quoterequest:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: QuoteRequest_uniqueKey): Promise<QuoteRequest | null> => {
            try {
                return await prisma.quoterequest.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting quoterequest:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_QuoteRequest)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_QuoteRequest): Promise<QuoteRequest[]> => {
            try {
                return await prisma.quoterequest.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all quoterequest:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_QuoteRequest)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_QuoteRequest
        ): Promise<QuoteRequest[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.quoterequest.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged quoterequest:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_QuoteRequest)
        * @returns 记录数量
        */
        Count: async (args?: filtered_QuoteRequest): Promise<number> => {
            try {
                return await prisma.quoterequest.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting quoterequest:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: QuoteRequest_uniqueKey; data: QuoteRequest_without_PKs }): Promise<QuoteRequest | null> => {
            try {
                return await prisma.quoterequest.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating quoterequest:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: QuoteRequest_uniqueKey): Promise<QuoteRequest | null> => {
            try {
                return await prisma.quoterequest.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting quoterequest:`, error);
                return null;
            }
        },  },
};
