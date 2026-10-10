
/**
 * Client
**/


declare global {
  namespace PrismaJson {
    // This namespace will always be empty. Definitions should be done by
    // you manually, and merged automatically by typescript. Make sure that
    // your declaration merging file is included in your tsconfig.json
    //
    // Learn more: https://github.com/arthurfiorette/prisma-json-types-generator/issues/143
    // Declaration Merging: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
  }
}

/** A filter to be used against nullable List types. */
export type NullableListFilter<T> = {
  equals?: T | T[] | null;
  has?: T | null;
  hasEvery?: T[];
  hasSome?: T[];
  isEmpty?: boolean;
};

/** A type to determine how to update a json field */
export type UpdateInput<T> = T extends object ? { [P in keyof T]?: UpdateInput<T[P]> } : T;

/** A type to determine how to update a json[] field */
export type UpdateManyInput<T> = T | T[] | { set?: T[]; push?: T | T[] };

/** A type to determine how to create a json[] input */
export type CreateManyInput<T> = T | T[] | { set?: T[] };

/**
 * A typed version of NestedStringFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of StringFilter, allowing narrowing of string types to discriminated
 * unions.
 */
export type TypedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of NestedStringWithAggregatesFilter, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedNestedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of StringWithAggregatesFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringWithAggregatesFilter is not present, this type is not used
  Prisma.StringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableWithAggregatesFilter, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNestedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableWithAggregatesFilter, allowing narrowing of string
 * types to discriminated unions.
 */
export type TypedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.StringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringFieldUpdateOperationsInput, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.StringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.StringFieldUpdateOperationsInput & {
    set?: S;
  };

/**
 * A typed version of NullableStringFieldUpdateOperationsInput, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNullableStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.NullableStringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.NullableStringFieldUpdateOperationsInput & {
    set?: S | null;
  };

/**
 * A typed version of StringNullableListFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableListFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableListFilter is not present, this type is not used
  Prisma.StringNullableListFilter & {
    equals?: S[] | null;
    has?: S | null;
    hasEvery?: S[];
    hasSome?: S[];
  };

/**
 * A typed version of the input type to update a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type UpdateStringArrayInput<S extends string> = {
  set?: S[];
  push?: S | S[];
};

/**
 * A typed version of the input type to create a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type CreateStringArrayInput<S extends string> = {
  set?: S[];
};
import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AccountUser
 * 
 */
export type AccountUser = $Result.DefaultSelection<Prisma.$AccountUserPayload>
/**
 * Model ServiceCategory
 * 
 */
export type ServiceCategory = $Result.DefaultSelection<Prisma.$ServiceCategoryPayload>
/**
 * Model ViennaDistrict
 * 
 */
export type ViennaDistrict = $Result.DefaultSelection<Prisma.$ViennaDistrictPayload>
/**
 * Model SetupChecklistItem
 * 
 */
export type SetupChecklistItem = $Result.DefaultSelection<Prisma.$SetupChecklistItemPayload>
/**
 * Model FaqItem
 * 
 */
export type FaqItem = $Result.DefaultSelection<Prisma.$FaqItemPayload>
/**
 * Model QuoteRequest
 * 
 */
export type QuoteRequest = $Result.DefaultSelection<Prisma.$QuoteRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccountUserRole: {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN'
};

export type AccountUserRole = (typeof AccountUserRole)[keyof typeof AccountUserRole]


export const ServiceCategoryKey: {
  ASSEMBLY: 'ASSEMBLY',
  DEMOLITION: 'DEMOLITION',
  FLOORING: 'FLOORING',
  PAINTING: 'PAINTING',
  DRYWALL: 'DRYWALL',
  PLUMBING_MINOR: 'PLUMBING_MINOR',
  BATHROOM_KITCHEN: 'BATHROOM_KITCHEN',
  DOORS_WINDOWS: 'DOORS_WINDOWS',
  OUTDOOR: 'OUTDOOR',
  MOVING: 'MOVING',
  COMMERCIAL: 'COMMERCIAL'
};

export type ServiceCategoryKey = (typeof ServiceCategoryKey)[keyof typeof ServiceCategoryKey]


export const CraftClassification: {
  FREIES_HANDWERK: 'FREIES_HANDWERK',
  MEISTER_KOOPERATION: 'MEISTER_KOOPERATION'
};

export type CraftClassification = (typeof CraftClassification)[keyof typeof CraftClassification]


export const LogisticsZone: {
  INNER_CITY: 'INNER_CITY',
  CENTRAL: 'CENTRAL',
  OUTER_RING: 'OUTER_RING',
  GREATER_SUBURB: 'GREATER_SUBURB'
};

export type LogisticsZone = (typeof LogisticsZone)[keyof typeof LogisticsZone]


export const ChecklistItemKey: {
  VAT_UID: 'VAT_UID',
  OFFICIAL_CONTACT: 'OFFICIAL_CONTACT',
  REGISTERED_ADDRESS: 'REGISTERED_ADDRESS',
  OPERATING_HOURS: 'OPERATING_HOURS'
};

export type ChecklistItemKey = (typeof ChecklistItemKey)[keyof typeof ChecklistItemKey]


export const ChecklistStatus: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED'
};

export type ChecklistStatus = (typeof ChecklistStatus)[keyof typeof ChecklistStatus]


export const FaqCategory: {
  PRICING: 'PRICING',
  SCOPE: 'SCOPE',
  SCHEDULING: 'SCHEDULING',
  MATERIALS: 'MATERIALS'
};

export type FaqCategory = (typeof FaqCategory)[keyof typeof FaqCategory]


export const PreferredTimeSlot: {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  FLEXIBLE: 'FLEXIBLE'
};

export type PreferredTimeSlot = (typeof PreferredTimeSlot)[keyof typeof PreferredTimeSlot]


export const SubmissionLanguage: {
  DE: 'DE',
  EN: 'EN',
  RU: 'RU'
};

export type SubmissionLanguage = (typeof SubmissionLanguage)[keyof typeof SubmissionLanguage]


export const QuoteStatus: {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  ESTIMATE_SENT: 'ESTIMATE_SENT',
  QUOTED: 'QUOTED',
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED'
};

export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus]

}

export type AccountUserRole = $Enums.AccountUserRole

export const AccountUserRole: typeof $Enums.AccountUserRole

export type ServiceCategoryKey = $Enums.ServiceCategoryKey

export const ServiceCategoryKey: typeof $Enums.ServiceCategoryKey

export type CraftClassification = $Enums.CraftClassification

export const CraftClassification: typeof $Enums.CraftClassification

export type LogisticsZone = $Enums.LogisticsZone

export const LogisticsZone: typeof $Enums.LogisticsZone

export type ChecklistItemKey = $Enums.ChecklistItemKey

export const ChecklistItemKey: typeof $Enums.ChecklistItemKey

export type ChecklistStatus = $Enums.ChecklistStatus

export const ChecklistStatus: typeof $Enums.ChecklistStatus

export type FaqCategory = $Enums.FaqCategory

export const FaqCategory: typeof $Enums.FaqCategory

export type PreferredTimeSlot = $Enums.PreferredTimeSlot

export const PreferredTimeSlot: typeof $Enums.PreferredTimeSlot

export type SubmissionLanguage = $Enums.SubmissionLanguage

export const SubmissionLanguage: typeof $Enums.SubmissionLanguage

export type QuoteStatus = $Enums.QuoteStatus

export const QuoteStatus: typeof $Enums.QuoteStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AccountUsers
 * const accountUsers = await prisma.accountUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AccountUsers
   * const accountUsers = await prisma.accountUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.accountUser`: Exposes CRUD operations for the **AccountUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountUsers
    * const accountUsers = await prisma.accountUser.findMany()
    * ```
    */
  get accountUser(): Prisma.AccountUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceCategory`: Exposes CRUD operations for the **ServiceCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceCategories
    * const serviceCategories = await prisma.serviceCategory.findMany()
    * ```
    */
  get serviceCategory(): Prisma.ServiceCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.viennaDistrict`: Exposes CRUD operations for the **ViennaDistrict** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ViennaDistricts
    * const viennaDistricts = await prisma.viennaDistrict.findMany()
    * ```
    */
  get viennaDistrict(): Prisma.ViennaDistrictDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setupChecklistItem`: Exposes CRUD operations for the **SetupChecklistItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SetupChecklistItems
    * const setupChecklistItems = await prisma.setupChecklistItem.findMany()
    * ```
    */
  get setupChecklistItem(): Prisma.SetupChecklistItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.faqItem`: Exposes CRUD operations for the **FaqItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FaqItems
    * const faqItems = await prisma.faqItem.findMany()
    * ```
    */
  get faqItem(): Prisma.FaqItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quoteRequest`: Exposes CRUD operations for the **QuoteRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuoteRequests
    * const quoteRequests = await prisma.quoteRequest.findMany()
    * ```
    */
  get quoteRequest(): Prisma.QuoteRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AccountUser: 'AccountUser',
    ServiceCategory: 'ServiceCategory',
    ViennaDistrict: 'ViennaDistrict',
    SetupChecklistItem: 'SetupChecklistItem',
    FaqItem: 'FaqItem',
    QuoteRequest: 'QuoteRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "accountUser" | "serviceCategory" | "viennaDistrict" | "setupChecklistItem" | "faqItem" | "quoteRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AccountUser: {
        payload: Prisma.$AccountUserPayload<ExtArgs>
        fields: Prisma.AccountUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          findFirst: {
            args: Prisma.AccountUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          findMany: {
            args: Prisma.AccountUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>[]
          }
          create: {
            args: Prisma.AccountUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          createMany: {
            args: Prisma.AccountUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          update: {
            args: Prisma.AccountUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          deleteMany: {
            args: Prisma.AccountUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountUserPayload>
          }
          aggregate: {
            args: Prisma.AccountUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccountUser>
          }
          groupBy: {
            args: Prisma.AccountUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountUserCountArgs<ExtArgs>
            result: $Utils.Optional<AccountUserCountAggregateOutputType> | number
          }
        }
      }
      ServiceCategory: {
        payload: Prisma.$ServiceCategoryPayload<ExtArgs>
        fields: Prisma.ServiceCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findFirst: {
            args: Prisma.ServiceCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findMany: {
            args: Prisma.ServiceCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          create: {
            args: Prisma.ServiceCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          createMany: {
            args: Prisma.ServiceCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ServiceCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          update: {
            args: Prisma.ServiceCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ServiceCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          aggregate: {
            args: Prisma.ServiceCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceCategory>
          }
          groupBy: {
            args: Prisma.ServiceCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryCountAggregateOutputType> | number
          }
        }
      }
      ViennaDistrict: {
        payload: Prisma.$ViennaDistrictPayload<ExtArgs>
        fields: Prisma.ViennaDistrictFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ViennaDistrictFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ViennaDistrictFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          findFirst: {
            args: Prisma.ViennaDistrictFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ViennaDistrictFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          findMany: {
            args: Prisma.ViennaDistrictFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>[]
          }
          create: {
            args: Prisma.ViennaDistrictCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          createMany: {
            args: Prisma.ViennaDistrictCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ViennaDistrictDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          update: {
            args: Prisma.ViennaDistrictUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          deleteMany: {
            args: Prisma.ViennaDistrictDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ViennaDistrictUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ViennaDistrictUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViennaDistrictPayload>
          }
          aggregate: {
            args: Prisma.ViennaDistrictAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateViennaDistrict>
          }
          groupBy: {
            args: Prisma.ViennaDistrictGroupByArgs<ExtArgs>
            result: $Utils.Optional<ViennaDistrictGroupByOutputType>[]
          }
          count: {
            args: Prisma.ViennaDistrictCountArgs<ExtArgs>
            result: $Utils.Optional<ViennaDistrictCountAggregateOutputType> | number
          }
        }
      }
      SetupChecklistItem: {
        payload: Prisma.$SetupChecklistItemPayload<ExtArgs>
        fields: Prisma.SetupChecklistItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SetupChecklistItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SetupChecklistItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          findFirst: {
            args: Prisma.SetupChecklistItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SetupChecklistItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          findMany: {
            args: Prisma.SetupChecklistItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>[]
          }
          create: {
            args: Prisma.SetupChecklistItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          createMany: {
            args: Prisma.SetupChecklistItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SetupChecklistItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          update: {
            args: Prisma.SetupChecklistItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          deleteMany: {
            args: Prisma.SetupChecklistItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SetupChecklistItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SetupChecklistItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupChecklistItemPayload>
          }
          aggregate: {
            args: Prisma.SetupChecklistItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetupChecklistItem>
          }
          groupBy: {
            args: Prisma.SetupChecklistItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SetupChecklistItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SetupChecklistItemCountArgs<ExtArgs>
            result: $Utils.Optional<SetupChecklistItemCountAggregateOutputType> | number
          }
        }
      }
      FaqItem: {
        payload: Prisma.$FaqItemPayload<ExtArgs>
        fields: Prisma.FaqItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaqItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaqItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          findFirst: {
            args: Prisma.FaqItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaqItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          findMany: {
            args: Prisma.FaqItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>[]
          }
          create: {
            args: Prisma.FaqItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          createMany: {
            args: Prisma.FaqItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FaqItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          update: {
            args: Prisma.FaqItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          deleteMany: {
            args: Prisma.FaqItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaqItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FaqItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          aggregate: {
            args: Prisma.FaqItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaqItem>
          }
          groupBy: {
            args: Prisma.FaqItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaqItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaqItemCountArgs<ExtArgs>
            result: $Utils.Optional<FaqItemCountAggregateOutputType> | number
          }
        }
      }
      QuoteRequest: {
        payload: Prisma.$QuoteRequestPayload<ExtArgs>
        fields: Prisma.QuoteRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuoteRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuoteRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          findFirst: {
            args: Prisma.QuoteRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuoteRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          findMany: {
            args: Prisma.QuoteRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>[]
          }
          create: {
            args: Prisma.QuoteRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          createMany: {
            args: Prisma.QuoteRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QuoteRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          update: {
            args: Prisma.QuoteRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          deleteMany: {
            args: Prisma.QuoteRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuoteRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuoteRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          aggregate: {
            args: Prisma.QuoteRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuoteRequest>
          }
          groupBy: {
            args: Prisma.QuoteRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuoteRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuoteRequestCountArgs<ExtArgs>
            result: $Utils.Optional<QuoteRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    accountUser?: AccountUserOmit
    serviceCategory?: ServiceCategoryOmit
    viennaDistrict?: ViennaDistrictOmit
    setupChecklistItem?: SetupChecklistItemOmit
    faqItem?: FaqItemOmit
    quoteRequest?: QuoteRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AccountUserCountOutputType
   */

  export type AccountUserCountOutputType = {
    quoteRequests: number
  }

  export type AccountUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | AccountUserCountOutputTypeCountQuoteRequestsArgs
  }

  // Custom InputTypes
  /**
   * AccountUserCountOutputType without action
   */
  export type AccountUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUserCountOutputType
     */
    select?: AccountUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountUserCountOutputType without action
   */
  export type AccountUserCountOutputTypeCountQuoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
  }


  /**
   * Count Type ServiceCategoryCountOutputType
   */

  export type ServiceCategoryCountOutputType = {
    quoteRequests: number
  }

  export type ServiceCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | ServiceCategoryCountOutputTypeCountQuoteRequestsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategoryCountOutputType
     */
    select?: ServiceCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeCountQuoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
  }


  /**
   * Count Type ViennaDistrictCountOutputType
   */

  export type ViennaDistrictCountOutputType = {
    quoteRequests: number
  }

  export type ViennaDistrictCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | ViennaDistrictCountOutputTypeCountQuoteRequestsArgs
  }

  // Custom InputTypes
  /**
   * ViennaDistrictCountOutputType without action
   */
  export type ViennaDistrictCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrictCountOutputType
     */
    select?: ViennaDistrictCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ViennaDistrictCountOutputType without action
   */
  export type ViennaDistrictCountOutputTypeCountQuoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AccountUser
   */

  export type AggregateAccountUser = {
    _count: AccountUserCountAggregateOutputType | null
    _min: AccountUserMinAggregateOutputType | null
    _max: AccountUserMaxAggregateOutputType | null
  }

  export type AccountUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.AccountUserRole | null
    fullName: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.AccountUserRole | null
    fullName: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountUserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    fullName: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountUserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    fullName?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountUserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    fullName?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountUserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    fullName?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountUser to aggregate.
     */
    where?: AccountUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountUsers to fetch.
     */
    orderBy?: AccountUserOrderByWithRelationInput | AccountUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountUsers
    **/
    _count?: true | AccountUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountUserMaxAggregateInputType
  }

  export type GetAccountUserAggregateType<T extends AccountUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountUser[P]>
      : GetScalarType<T[P], AggregateAccountUser[P]>
  }




  export type AccountUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountUserWhereInput
    orderBy?: AccountUserOrderByWithAggregationInput | AccountUserOrderByWithAggregationInput[]
    by: AccountUserScalarFieldEnum[] | AccountUserScalarFieldEnum
    having?: AccountUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountUserCountAggregateInputType | true
    _min?: AccountUserMinAggregateInputType
    _max?: AccountUserMaxAggregateInputType
  }

  export type AccountUserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.AccountUserRole
    fullName: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountUserCountAggregateOutputType | null
    _min: AccountUserMinAggregateOutputType | null
    _max: AccountUserMaxAggregateOutputType | null
  }

  type GetAccountUserGroupByPayload<T extends AccountUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountUserGroupByOutputType[P]>
            : GetScalarType<T[P], AccountUserGroupByOutputType[P]>
        }
      >
    >


  export type AccountUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fullName?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quoteRequests?: boolean | AccountUser$quoteRequestsArgs<ExtArgs>
    _count?: boolean | AccountUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountUser"]>



  export type AccountUserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    fullName?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "fullName" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["accountUser"]>
  export type AccountUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | AccountUser$quoteRequestsArgs<ExtArgs>
    _count?: boolean | AccountUserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AccountUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccountUser"
    objects: {
      quoteRequests: Prisma.$QuoteRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.AccountUserRole
      fullName: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["accountUser"]>
    composites: {}
  }

  type AccountUserGetPayload<S extends boolean | null | undefined | AccountUserDefaultArgs> = $Result.GetResult<Prisma.$AccountUserPayload, S>

  type AccountUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountUserCountAggregateInputType | true
    }

  export interface AccountUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccountUser'], meta: { name: 'AccountUser' } }
    /**
     * Find zero or one AccountUser that matches the filter.
     * @param {AccountUserFindUniqueArgs} args - Arguments to find a AccountUser
     * @example
     * // Get one AccountUser
     * const accountUser = await prisma.accountUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountUserFindUniqueArgs>(args: SelectSubset<T, AccountUserFindUniqueArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccountUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountUserFindUniqueOrThrowArgs} args - Arguments to find a AccountUser
     * @example
     * // Get one AccountUser
     * const accountUser = await prisma.accountUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserFindFirstArgs} args - Arguments to find a AccountUser
     * @example
     * // Get one AccountUser
     * const accountUser = await prisma.accountUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountUserFindFirstArgs>(args?: SelectSubset<T, AccountUserFindFirstArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserFindFirstOrThrowArgs} args - Arguments to find a AccountUser
     * @example
     * // Get one AccountUser
     * const accountUser = await prisma.accountUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccountUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountUsers
     * const accountUsers = await prisma.accountUser.findMany()
     * 
     * // Get first 10 AccountUsers
     * const accountUsers = await prisma.accountUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountUserWithIdOnly = await prisma.accountUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountUserFindManyArgs>(args?: SelectSubset<T, AccountUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccountUser.
     * @param {AccountUserCreateArgs} args - Arguments to create a AccountUser.
     * @example
     * // Create one AccountUser
     * const AccountUser = await prisma.accountUser.create({
     *   data: {
     *     // ... data to create a AccountUser
     *   }
     * })
     * 
     */
    create<T extends AccountUserCreateArgs>(args: SelectSubset<T, AccountUserCreateArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccountUsers.
     * @param {AccountUserCreateManyArgs} args - Arguments to create many AccountUsers.
     * @example
     * // Create many AccountUsers
     * const accountUser = await prisma.accountUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountUserCreateManyArgs>(args?: SelectSubset<T, AccountUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AccountUser.
     * @param {AccountUserDeleteArgs} args - Arguments to delete one AccountUser.
     * @example
     * // Delete one AccountUser
     * const AccountUser = await prisma.accountUser.delete({
     *   where: {
     *     // ... filter to delete one AccountUser
     *   }
     * })
     * 
     */
    delete<T extends AccountUserDeleteArgs>(args: SelectSubset<T, AccountUserDeleteArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccountUser.
     * @param {AccountUserUpdateArgs} args - Arguments to update one AccountUser.
     * @example
     * // Update one AccountUser
     * const accountUser = await prisma.accountUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUserUpdateArgs>(args: SelectSubset<T, AccountUserUpdateArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccountUsers.
     * @param {AccountUserDeleteManyArgs} args - Arguments to filter AccountUsers to delete.
     * @example
     * // Delete a few AccountUsers
     * const { count } = await prisma.accountUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountUserDeleteManyArgs>(args?: SelectSubset<T, AccountUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountUsers
     * const accountUser = await prisma.accountUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUserUpdateManyArgs>(args: SelectSubset<T, AccountUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountUser.
     * @param {AccountUserUpsertArgs} args - Arguments to update or create a AccountUser.
     * @example
     * // Update or create a AccountUser
     * const accountUser = await prisma.accountUser.upsert({
     *   create: {
     *     // ... data to create a AccountUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountUser we want to update
     *   }
     * })
     */
    upsert<T extends AccountUserUpsertArgs>(args: SelectSubset<T, AccountUserUpsertArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccountUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserCountArgs} args - Arguments to filter AccountUsers to count.
     * @example
     * // Count the number of AccountUsers
     * const count = await prisma.accountUser.count({
     *   where: {
     *     // ... the filter for the AccountUsers we want to count
     *   }
     * })
    **/
    count<T extends AccountUserCountArgs>(
      args?: Subset<T, AccountUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountUserAggregateArgs>(args: Subset<T, AccountUserAggregateArgs>): Prisma.PrismaPromise<GetAccountUserAggregateType<T>>

    /**
     * Group by AccountUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountUserGroupByArgs['orderBy'] }
        : { orderBy?: AccountUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccountUser model
   */
  readonly fields: AccountUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quoteRequests<T extends AccountUser$quoteRequestsArgs<ExtArgs> = {}>(args?: Subset<T, AccountUser$quoteRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccountUser model
   */
  interface AccountUserFieldRefs {
    readonly id: FieldRef<"AccountUser", 'String'>
    readonly email: FieldRef<"AccountUser", 'String'>
    readonly passwordHash: FieldRef<"AccountUser", 'String'>
    readonly role: FieldRef<"AccountUser", 'AccountUserRole'>
    readonly fullName: FieldRef<"AccountUser", 'String'>
    readonly phone: FieldRef<"AccountUser", 'String'>
    readonly createdAt: FieldRef<"AccountUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AccountUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccountUser findUnique
   */
  export type AccountUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter, which AccountUser to fetch.
     */
    where: AccountUserWhereUniqueInput
  }

  /**
   * AccountUser findUniqueOrThrow
   */
  export type AccountUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter, which AccountUser to fetch.
     */
    where: AccountUserWhereUniqueInput
  }

  /**
   * AccountUser findFirst
   */
  export type AccountUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter, which AccountUser to fetch.
     */
    where?: AccountUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountUsers to fetch.
     */
    orderBy?: AccountUserOrderByWithRelationInput | AccountUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountUsers.
     */
    cursor?: AccountUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountUsers.
     */
    distinct?: AccountUserScalarFieldEnum | AccountUserScalarFieldEnum[]
  }

  /**
   * AccountUser findFirstOrThrow
   */
  export type AccountUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter, which AccountUser to fetch.
     */
    where?: AccountUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountUsers to fetch.
     */
    orderBy?: AccountUserOrderByWithRelationInput | AccountUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountUsers.
     */
    cursor?: AccountUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountUsers.
     */
    distinct?: AccountUserScalarFieldEnum | AccountUserScalarFieldEnum[]
  }

  /**
   * AccountUser findMany
   */
  export type AccountUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter, which AccountUsers to fetch.
     */
    where?: AccountUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountUsers to fetch.
     */
    orderBy?: AccountUserOrderByWithRelationInput | AccountUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountUsers.
     */
    cursor?: AccountUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountUsers.
     */
    skip?: number
    distinct?: AccountUserScalarFieldEnum | AccountUserScalarFieldEnum[]
  }

  /**
   * AccountUser create
   */
  export type AccountUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AccountUser.
     */
    data: XOR<AccountUserCreateInput, AccountUserUncheckedCreateInput>
  }

  /**
   * AccountUser createMany
   */
  export type AccountUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountUsers.
     */
    data: AccountUserCreateManyInput | AccountUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountUser update
   */
  export type AccountUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AccountUser.
     */
    data: XOR<AccountUserUpdateInput, AccountUserUncheckedUpdateInput>
    /**
     * Choose, which AccountUser to update.
     */
    where: AccountUserWhereUniqueInput
  }

  /**
   * AccountUser updateMany
   */
  export type AccountUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountUsers.
     */
    data: XOR<AccountUserUpdateManyMutationInput, AccountUserUncheckedUpdateManyInput>
    /**
     * Filter which AccountUsers to update
     */
    where?: AccountUserWhereInput
    /**
     * Limit how many AccountUsers to update.
     */
    limit?: number
  }

  /**
   * AccountUser upsert
   */
  export type AccountUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AccountUser to update in case it exists.
     */
    where: AccountUserWhereUniqueInput
    /**
     * In case the AccountUser found by the `where` argument doesn't exist, create a new AccountUser with this data.
     */
    create: XOR<AccountUserCreateInput, AccountUserUncheckedCreateInput>
    /**
     * In case the AccountUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUserUpdateInput, AccountUserUncheckedUpdateInput>
  }

  /**
   * AccountUser delete
   */
  export type AccountUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    /**
     * Filter which AccountUser to delete.
     */
    where: AccountUserWhereUniqueInput
  }

  /**
   * AccountUser deleteMany
   */
  export type AccountUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountUsers to delete
     */
    where?: AccountUserWhereInput
    /**
     * Limit how many AccountUsers to delete.
     */
    limit?: number
  }

  /**
   * AccountUser.quoteRequests
   */
  export type AccountUser$quoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    cursor?: QuoteRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * AccountUser without action
   */
  export type AccountUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
  }


  /**
   * Model ServiceCategory
   */

  export type AggregateServiceCategory = {
    _count: ServiceCategoryCountAggregateOutputType | null
    _avg: ServiceCategoryAvgAggregateOutputType | null
    _sum: ServiceCategorySumAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  export type ServiceCategoryAvgAggregateOutputType = {
    baselineHourlyRate: Decimal | null
    displayOrder: number | null
  }

  export type ServiceCategorySumAggregateOutputType = {
    baselineHourlyRate: Decimal | null
    displayOrder: number | null
  }

  export type ServiceCategoryMinAggregateOutputType = {
    id: string | null
    key: $Enums.ServiceCategoryKey | null
    titleDe: string | null
    titleEn: string | null
    titleRu: string | null
    baselineHourlyRate: Decimal | null
    typicalRangeEur: string | null
    craftClassification: $Enums.CraftClassification | null
    leadArtisan: string | null
    isFeatured: boolean | null
    descriptionDe: string | null
    descriptionEn: string | null
    descriptionRu: string | null
    imageUrl: string | null
    iconName: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryMaxAggregateOutputType = {
    id: string | null
    key: $Enums.ServiceCategoryKey | null
    titleDe: string | null
    titleEn: string | null
    titleRu: string | null
    baselineHourlyRate: Decimal | null
    typicalRangeEur: string | null
    craftClassification: $Enums.CraftClassification | null
    leadArtisan: string | null
    isFeatured: boolean | null
    descriptionDe: string | null
    descriptionEn: string | null
    descriptionRu: string | null
    imageUrl: string | null
    iconName: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryCountAggregateOutputType = {
    id: number
    key: number
    titleDe: number
    titleEn: number
    titleRu: number
    baselineHourlyRate: number
    typicalRangeEur: number
    craftClassification: number
    leadArtisan: number
    isFeatured: number
    descriptionDe: number
    descriptionEn: number
    descriptionRu: number
    imageUrl: number
    iconName: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceCategoryAvgAggregateInputType = {
    baselineHourlyRate?: true
    displayOrder?: true
  }

  export type ServiceCategorySumAggregateInputType = {
    baselineHourlyRate?: true
    displayOrder?: true
  }

  export type ServiceCategoryMinAggregateInputType = {
    id?: true
    key?: true
    titleDe?: true
    titleEn?: true
    titleRu?: true
    baselineHourlyRate?: true
    typicalRangeEur?: true
    craftClassification?: true
    leadArtisan?: true
    isFeatured?: true
    descriptionDe?: true
    descriptionEn?: true
    descriptionRu?: true
    imageUrl?: true
    iconName?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryMaxAggregateInputType = {
    id?: true
    key?: true
    titleDe?: true
    titleEn?: true
    titleRu?: true
    baselineHourlyRate?: true
    typicalRangeEur?: true
    craftClassification?: true
    leadArtisan?: true
    isFeatured?: true
    descriptionDe?: true
    descriptionEn?: true
    descriptionRu?: true
    imageUrl?: true
    iconName?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryCountAggregateInputType = {
    id?: true
    key?: true
    titleDe?: true
    titleEn?: true
    titleRu?: true
    baselineHourlyRate?: true
    typicalRangeEur?: true
    craftClassification?: true
    leadArtisan?: true
    isFeatured?: true
    descriptionDe?: true
    descriptionEn?: true
    descriptionRu?: true
    imageUrl?: true
    iconName?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategory to aggregate.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceCategories
    **/
    _count?: true | ServiceCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type GetServiceCategoryAggregateType<T extends ServiceCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceCategory[P]>
      : GetScalarType<T[P], AggregateServiceCategory[P]>
  }




  export type ServiceCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceCategoryWhereInput
    orderBy?: ServiceCategoryOrderByWithAggregationInput | ServiceCategoryOrderByWithAggregationInput[]
    by: ServiceCategoryScalarFieldEnum[] | ServiceCategoryScalarFieldEnum
    having?: ServiceCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCategoryCountAggregateInputType | true
    _avg?: ServiceCategoryAvgAggregateInputType
    _sum?: ServiceCategorySumAggregateInputType
    _min?: ServiceCategoryMinAggregateInputType
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type ServiceCategoryGroupByOutputType = {
    id: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal
    typicalRangeEur: string
    craftClassification: $Enums.CraftClassification
    leadArtisan: string | null
    isFeatured: boolean
    descriptionDe: string | null
    descriptionEn: string | null
    descriptionRu: string | null
    imageUrl: string | null
    iconName: string | null
    displayOrder: number | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceCategoryCountAggregateOutputType | null
    _avg: ServiceCategoryAvgAggregateOutputType | null
    _sum: ServiceCategorySumAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  type GetServiceCategoryGroupByPayload<T extends ServiceCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ServiceCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    titleDe?: boolean
    titleEn?: boolean
    titleRu?: boolean
    baselineHourlyRate?: boolean
    typicalRangeEur?: boolean
    craftClassification?: boolean
    leadArtisan?: boolean
    isFeatured?: boolean
    descriptionDe?: boolean
    descriptionEn?: boolean
    descriptionRu?: boolean
    imageUrl?: boolean
    iconName?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quoteRequests?: boolean | ServiceCategory$quoteRequestsArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceCategory"]>



  export type ServiceCategorySelectScalar = {
    id?: boolean
    key?: boolean
    titleDe?: boolean
    titleEn?: boolean
    titleRu?: boolean
    baselineHourlyRate?: boolean
    typicalRangeEur?: boolean
    craftClassification?: boolean
    leadArtisan?: boolean
    isFeatured?: boolean
    descriptionDe?: boolean
    descriptionEn?: boolean
    descriptionRu?: boolean
    imageUrl?: boolean
    iconName?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "titleDe" | "titleEn" | "titleRu" | "baselineHourlyRate" | "typicalRangeEur" | "craftClassification" | "leadArtisan" | "isFeatured" | "descriptionDe" | "descriptionEn" | "descriptionRu" | "imageUrl" | "iconName" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceCategory"]>
  export type ServiceCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | ServiceCategory$quoteRequestsArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ServiceCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceCategory"
    objects: {
      quoteRequests: Prisma.$QuoteRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: $Enums.ServiceCategoryKey
      titleDe: string
      titleEn: string
      titleRu: string
      baselineHourlyRate: Prisma.Decimal
      typicalRangeEur: string
      craftClassification: $Enums.CraftClassification
      leadArtisan: string | null
      isFeatured: boolean
      descriptionDe: string | null
      descriptionEn: string | null
      descriptionRu: string | null
      imageUrl: string | null
      iconName: string | null
      displayOrder: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceCategory"]>
    composites: {}
  }

  type ServiceCategoryGetPayload<S extends boolean | null | undefined | ServiceCategoryDefaultArgs> = $Result.GetResult<Prisma.$ServiceCategoryPayload, S>

  type ServiceCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCategoryCountAggregateInputType | true
    }

  export interface ServiceCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceCategory'], meta: { name: 'ServiceCategory' } }
    /**
     * Find zero or one ServiceCategory that matches the filter.
     * @param {ServiceCategoryFindUniqueArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceCategoryFindUniqueArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceCategoryFindUniqueOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceCategoryFindFirstArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany()
     * 
     * // Get first 10 ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceCategoryFindManyArgs>(args?: SelectSubset<T, ServiceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceCategory.
     * @param {ServiceCategoryCreateArgs} args - Arguments to create a ServiceCategory.
     * @example
     * // Create one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.create({
     *   data: {
     *     // ... data to create a ServiceCategory
     *   }
     * })
     * 
     */
    create<T extends ServiceCategoryCreateArgs>(args: SelectSubset<T, ServiceCategoryCreateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceCategories.
     * @param {ServiceCategoryCreateManyArgs} args - Arguments to create many ServiceCategories.
     * @example
     * // Create many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCategoryCreateManyArgs>(args?: SelectSubset<T, ServiceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ServiceCategory.
     * @param {ServiceCategoryDeleteArgs} args - Arguments to delete one ServiceCategory.
     * @example
     * // Delete one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.delete({
     *   where: {
     *     // ... filter to delete one ServiceCategory
     *   }
     * })
     * 
     */
    delete<T extends ServiceCategoryDeleteArgs>(args: SelectSubset<T, ServiceCategoryDeleteArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceCategory.
     * @param {ServiceCategoryUpdateArgs} args - Arguments to update one ServiceCategory.
     * @example
     * // Update one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceCategoryUpdateArgs>(args: SelectSubset<T, ServiceCategoryUpdateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceCategories.
     * @param {ServiceCategoryDeleteManyArgs} args - Arguments to filter ServiceCategories to delete.
     * @example
     * // Delete a few ServiceCategories
     * const { count } = await prisma.serviceCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceCategoryDeleteManyArgs>(args?: SelectSubset<T, ServiceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceCategoryUpdateManyArgs>(args: SelectSubset<T, ServiceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServiceCategory.
     * @param {ServiceCategoryUpsertArgs} args - Arguments to update or create a ServiceCategory.
     * @example
     * // Update or create a ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.upsert({
     *   create: {
     *     // ... data to create a ServiceCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceCategory we want to update
     *   }
     * })
     */
    upsert<T extends ServiceCategoryUpsertArgs>(args: SelectSubset<T, ServiceCategoryUpsertArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryCountArgs} args - Arguments to filter ServiceCategories to count.
     * @example
     * // Count the number of ServiceCategories
     * const count = await prisma.serviceCategory.count({
     *   where: {
     *     // ... the filter for the ServiceCategories we want to count
     *   }
     * })
    **/
    count<T extends ServiceCategoryCountArgs>(
      args?: Subset<T, ServiceCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceCategoryAggregateArgs>(args: Subset<T, ServiceCategoryAggregateArgs>): Prisma.PrismaPromise<GetServiceCategoryAggregateType<T>>

    /**
     * Group by ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ServiceCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceCategory model
   */
  readonly fields: ServiceCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quoteRequests<T extends ServiceCategory$quoteRequestsArgs<ExtArgs> = {}>(args?: Subset<T, ServiceCategory$quoteRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceCategory model
   */
  interface ServiceCategoryFieldRefs {
    readonly id: FieldRef<"ServiceCategory", 'String'>
    readonly key: FieldRef<"ServiceCategory", 'ServiceCategoryKey'>
    readonly titleDe: FieldRef<"ServiceCategory", 'String'>
    readonly titleEn: FieldRef<"ServiceCategory", 'String'>
    readonly titleRu: FieldRef<"ServiceCategory", 'String'>
    readonly baselineHourlyRate: FieldRef<"ServiceCategory", 'Decimal'>
    readonly typicalRangeEur: FieldRef<"ServiceCategory", 'String'>
    readonly craftClassification: FieldRef<"ServiceCategory", 'CraftClassification'>
    readonly leadArtisan: FieldRef<"ServiceCategory", 'String'>
    readonly isFeatured: FieldRef<"ServiceCategory", 'Boolean'>
    readonly descriptionDe: FieldRef<"ServiceCategory", 'String'>
    readonly descriptionEn: FieldRef<"ServiceCategory", 'String'>
    readonly descriptionRu: FieldRef<"ServiceCategory", 'String'>
    readonly imageUrl: FieldRef<"ServiceCategory", 'String'>
    readonly iconName: FieldRef<"ServiceCategory", 'String'>
    readonly displayOrder: FieldRef<"ServiceCategory", 'Int'>
    readonly createdAt: FieldRef<"ServiceCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceCategory findUnique
   */
  export type ServiceCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findUniqueOrThrow
   */
  export type ServiceCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findFirst
   */
  export type ServiceCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findFirstOrThrow
   */
  export type ServiceCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findMany
   */
  export type ServiceCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategories to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory create
   */
  export type ServiceCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceCategory.
     */
    data: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
  }

  /**
   * ServiceCategory createMany
   */
  export type ServiceCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceCategories.
     */
    data: ServiceCategoryCreateManyInput | ServiceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceCategory update
   */
  export type ServiceCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceCategory.
     */
    data: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
    /**
     * Choose, which ServiceCategory to update.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory updateMany
   */
  export type ServiceCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceCategories.
     */
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceCategories to update
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to update.
     */
    limit?: number
  }

  /**
   * ServiceCategory upsert
   */
  export type ServiceCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceCategory to update in case it exists.
     */
    where: ServiceCategoryWhereUniqueInput
    /**
     * In case the ServiceCategory found by the `where` argument doesn't exist, create a new ServiceCategory with this data.
     */
    create: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
    /**
     * In case the ServiceCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
  }

  /**
   * ServiceCategory delete
   */
  export type ServiceCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter which ServiceCategory to delete.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory deleteMany
   */
  export type ServiceCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategories to delete
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to delete.
     */
    limit?: number
  }

  /**
   * ServiceCategory.quoteRequests
   */
  export type ServiceCategory$quoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    cursor?: QuoteRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * ServiceCategory without action
   */
  export type ServiceCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
  }


  /**
   * Model ViennaDistrict
   */

  export type AggregateViennaDistrict = {
    _count: ViennaDistrictCountAggregateOutputType | null
    _avg: ViennaDistrictAvgAggregateOutputType | null
    _sum: ViennaDistrictSumAggregateOutputType | null
    _min: ViennaDistrictMinAggregateOutputType | null
    _max: ViennaDistrictMaxAggregateOutputType | null
  }

  export type ViennaDistrictAvgAggregateOutputType = {
    districtNumber: number | null
    leadTimeHours: number | null
  }

  export type ViennaDistrictSumAggregateOutputType = {
    districtNumber: number | null
    leadTimeHours: number | null
  }

  export type ViennaDistrictMinAggregateOutputType = {
    id: string | null
    districtCode: string | null
    districtName: string | null
    districtNumber: number | null
    zone: $Enums.LogisticsZone | null
    leadTimeHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViennaDistrictMaxAggregateOutputType = {
    id: string | null
    districtCode: string | null
    districtName: string | null
    districtNumber: number | null
    zone: $Enums.LogisticsZone | null
    leadTimeHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViennaDistrictCountAggregateOutputType = {
    id: number
    districtCode: number
    districtName: number
    districtNumber: number
    zone: number
    leadTimeHours: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ViennaDistrictAvgAggregateInputType = {
    districtNumber?: true
    leadTimeHours?: true
  }

  export type ViennaDistrictSumAggregateInputType = {
    districtNumber?: true
    leadTimeHours?: true
  }

  export type ViennaDistrictMinAggregateInputType = {
    id?: true
    districtCode?: true
    districtName?: true
    districtNumber?: true
    zone?: true
    leadTimeHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViennaDistrictMaxAggregateInputType = {
    id?: true
    districtCode?: true
    districtName?: true
    districtNumber?: true
    zone?: true
    leadTimeHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViennaDistrictCountAggregateInputType = {
    id?: true
    districtCode?: true
    districtName?: true
    districtNumber?: true
    zone?: true
    leadTimeHours?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ViennaDistrictAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ViennaDistrict to aggregate.
     */
    where?: ViennaDistrictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViennaDistricts to fetch.
     */
    orderBy?: ViennaDistrictOrderByWithRelationInput | ViennaDistrictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ViennaDistrictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViennaDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViennaDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ViennaDistricts
    **/
    _count?: true | ViennaDistrictCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ViennaDistrictAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ViennaDistrictSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ViennaDistrictMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ViennaDistrictMaxAggregateInputType
  }

  export type GetViennaDistrictAggregateType<T extends ViennaDistrictAggregateArgs> = {
        [P in keyof T & keyof AggregateViennaDistrict]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateViennaDistrict[P]>
      : GetScalarType<T[P], AggregateViennaDistrict[P]>
  }




  export type ViennaDistrictGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViennaDistrictWhereInput
    orderBy?: ViennaDistrictOrderByWithAggregationInput | ViennaDistrictOrderByWithAggregationInput[]
    by: ViennaDistrictScalarFieldEnum[] | ViennaDistrictScalarFieldEnum
    having?: ViennaDistrictScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ViennaDistrictCountAggregateInputType | true
    _avg?: ViennaDistrictAvgAggregateInputType
    _sum?: ViennaDistrictSumAggregateInputType
    _min?: ViennaDistrictMinAggregateInputType
    _max?: ViennaDistrictMaxAggregateInputType
  }

  export type ViennaDistrictGroupByOutputType = {
    id: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt: Date
    updatedAt: Date
    _count: ViennaDistrictCountAggregateOutputType | null
    _avg: ViennaDistrictAvgAggregateOutputType | null
    _sum: ViennaDistrictSumAggregateOutputType | null
    _min: ViennaDistrictMinAggregateOutputType | null
    _max: ViennaDistrictMaxAggregateOutputType | null
  }

  type GetViennaDistrictGroupByPayload<T extends ViennaDistrictGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ViennaDistrictGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ViennaDistrictGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ViennaDistrictGroupByOutputType[P]>
            : GetScalarType<T[P], ViennaDistrictGroupByOutputType[P]>
        }
      >
    >


  export type ViennaDistrictSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    districtCode?: boolean
    districtName?: boolean
    districtNumber?: boolean
    zone?: boolean
    leadTimeHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quoteRequests?: boolean | ViennaDistrict$quoteRequestsArgs<ExtArgs>
    _count?: boolean | ViennaDistrictCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["viennaDistrict"]>



  export type ViennaDistrictSelectScalar = {
    id?: boolean
    districtCode?: boolean
    districtName?: boolean
    districtNumber?: boolean
    zone?: boolean
    leadTimeHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ViennaDistrictOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "districtCode" | "districtName" | "districtNumber" | "zone" | "leadTimeHours" | "createdAt" | "updatedAt", ExtArgs["result"]["viennaDistrict"]>
  export type ViennaDistrictInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quoteRequests?: boolean | ViennaDistrict$quoteRequestsArgs<ExtArgs>
    _count?: boolean | ViennaDistrictCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ViennaDistrictPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ViennaDistrict"
    objects: {
      quoteRequests: Prisma.$QuoteRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      districtCode: string
      districtName: string
      districtNumber: number
      zone: $Enums.LogisticsZone
      leadTimeHours: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["viennaDistrict"]>
    composites: {}
  }

  type ViennaDistrictGetPayload<S extends boolean | null | undefined | ViennaDistrictDefaultArgs> = $Result.GetResult<Prisma.$ViennaDistrictPayload, S>

  type ViennaDistrictCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ViennaDistrictFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ViennaDistrictCountAggregateInputType | true
    }

  export interface ViennaDistrictDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ViennaDistrict'], meta: { name: 'ViennaDistrict' } }
    /**
     * Find zero or one ViennaDistrict that matches the filter.
     * @param {ViennaDistrictFindUniqueArgs} args - Arguments to find a ViennaDistrict
     * @example
     * // Get one ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ViennaDistrictFindUniqueArgs>(args: SelectSubset<T, ViennaDistrictFindUniqueArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ViennaDistrict that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ViennaDistrictFindUniqueOrThrowArgs} args - Arguments to find a ViennaDistrict
     * @example
     * // Get one ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ViennaDistrictFindUniqueOrThrowArgs>(args: SelectSubset<T, ViennaDistrictFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ViennaDistrict that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictFindFirstArgs} args - Arguments to find a ViennaDistrict
     * @example
     * // Get one ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ViennaDistrictFindFirstArgs>(args?: SelectSubset<T, ViennaDistrictFindFirstArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ViennaDistrict that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictFindFirstOrThrowArgs} args - Arguments to find a ViennaDistrict
     * @example
     * // Get one ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ViennaDistrictFindFirstOrThrowArgs>(args?: SelectSubset<T, ViennaDistrictFindFirstOrThrowArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ViennaDistricts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ViennaDistricts
     * const viennaDistricts = await prisma.viennaDistrict.findMany()
     * 
     * // Get first 10 ViennaDistricts
     * const viennaDistricts = await prisma.viennaDistrict.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const viennaDistrictWithIdOnly = await prisma.viennaDistrict.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ViennaDistrictFindManyArgs>(args?: SelectSubset<T, ViennaDistrictFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ViennaDistrict.
     * @param {ViennaDistrictCreateArgs} args - Arguments to create a ViennaDistrict.
     * @example
     * // Create one ViennaDistrict
     * const ViennaDistrict = await prisma.viennaDistrict.create({
     *   data: {
     *     // ... data to create a ViennaDistrict
     *   }
     * })
     * 
     */
    create<T extends ViennaDistrictCreateArgs>(args: SelectSubset<T, ViennaDistrictCreateArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ViennaDistricts.
     * @param {ViennaDistrictCreateManyArgs} args - Arguments to create many ViennaDistricts.
     * @example
     * // Create many ViennaDistricts
     * const viennaDistrict = await prisma.viennaDistrict.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ViennaDistrictCreateManyArgs>(args?: SelectSubset<T, ViennaDistrictCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ViennaDistrict.
     * @param {ViennaDistrictDeleteArgs} args - Arguments to delete one ViennaDistrict.
     * @example
     * // Delete one ViennaDistrict
     * const ViennaDistrict = await prisma.viennaDistrict.delete({
     *   where: {
     *     // ... filter to delete one ViennaDistrict
     *   }
     * })
     * 
     */
    delete<T extends ViennaDistrictDeleteArgs>(args: SelectSubset<T, ViennaDistrictDeleteArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ViennaDistrict.
     * @param {ViennaDistrictUpdateArgs} args - Arguments to update one ViennaDistrict.
     * @example
     * // Update one ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ViennaDistrictUpdateArgs>(args: SelectSubset<T, ViennaDistrictUpdateArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ViennaDistricts.
     * @param {ViennaDistrictDeleteManyArgs} args - Arguments to filter ViennaDistricts to delete.
     * @example
     * // Delete a few ViennaDistricts
     * const { count } = await prisma.viennaDistrict.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ViennaDistrictDeleteManyArgs>(args?: SelectSubset<T, ViennaDistrictDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ViennaDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ViennaDistricts
     * const viennaDistrict = await prisma.viennaDistrict.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ViennaDistrictUpdateManyArgs>(args: SelectSubset<T, ViennaDistrictUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ViennaDistrict.
     * @param {ViennaDistrictUpsertArgs} args - Arguments to update or create a ViennaDistrict.
     * @example
     * // Update or create a ViennaDistrict
     * const viennaDistrict = await prisma.viennaDistrict.upsert({
     *   create: {
     *     // ... data to create a ViennaDistrict
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ViennaDistrict we want to update
     *   }
     * })
     */
    upsert<T extends ViennaDistrictUpsertArgs>(args: SelectSubset<T, ViennaDistrictUpsertArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ViennaDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictCountArgs} args - Arguments to filter ViennaDistricts to count.
     * @example
     * // Count the number of ViennaDistricts
     * const count = await prisma.viennaDistrict.count({
     *   where: {
     *     // ... the filter for the ViennaDistricts we want to count
     *   }
     * })
    **/
    count<T extends ViennaDistrictCountArgs>(
      args?: Subset<T, ViennaDistrictCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ViennaDistrictCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ViennaDistrict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ViennaDistrictAggregateArgs>(args: Subset<T, ViennaDistrictAggregateArgs>): Prisma.PrismaPromise<GetViennaDistrictAggregateType<T>>

    /**
     * Group by ViennaDistrict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViennaDistrictGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ViennaDistrictGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ViennaDistrictGroupByArgs['orderBy'] }
        : { orderBy?: ViennaDistrictGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ViennaDistrictGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetViennaDistrictGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ViennaDistrict model
   */
  readonly fields: ViennaDistrictFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ViennaDistrict.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ViennaDistrictClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quoteRequests<T extends ViennaDistrict$quoteRequestsArgs<ExtArgs> = {}>(args?: Subset<T, ViennaDistrict$quoteRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ViennaDistrict model
   */
  interface ViennaDistrictFieldRefs {
    readonly id: FieldRef<"ViennaDistrict", 'String'>
    readonly districtCode: FieldRef<"ViennaDistrict", 'String'>
    readonly districtName: FieldRef<"ViennaDistrict", 'String'>
    readonly districtNumber: FieldRef<"ViennaDistrict", 'Int'>
    readonly zone: FieldRef<"ViennaDistrict", 'LogisticsZone'>
    readonly leadTimeHours: FieldRef<"ViennaDistrict", 'Int'>
    readonly createdAt: FieldRef<"ViennaDistrict", 'DateTime'>
    readonly updatedAt: FieldRef<"ViennaDistrict", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ViennaDistrict findUnique
   */
  export type ViennaDistrictFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter, which ViennaDistrict to fetch.
     */
    where: ViennaDistrictWhereUniqueInput
  }

  /**
   * ViennaDistrict findUniqueOrThrow
   */
  export type ViennaDistrictFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter, which ViennaDistrict to fetch.
     */
    where: ViennaDistrictWhereUniqueInput
  }

  /**
   * ViennaDistrict findFirst
   */
  export type ViennaDistrictFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter, which ViennaDistrict to fetch.
     */
    where?: ViennaDistrictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViennaDistricts to fetch.
     */
    orderBy?: ViennaDistrictOrderByWithRelationInput | ViennaDistrictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ViennaDistricts.
     */
    cursor?: ViennaDistrictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViennaDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViennaDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ViennaDistricts.
     */
    distinct?: ViennaDistrictScalarFieldEnum | ViennaDistrictScalarFieldEnum[]
  }

  /**
   * ViennaDistrict findFirstOrThrow
   */
  export type ViennaDistrictFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter, which ViennaDistrict to fetch.
     */
    where?: ViennaDistrictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViennaDistricts to fetch.
     */
    orderBy?: ViennaDistrictOrderByWithRelationInput | ViennaDistrictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ViennaDistricts.
     */
    cursor?: ViennaDistrictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViennaDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViennaDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ViennaDistricts.
     */
    distinct?: ViennaDistrictScalarFieldEnum | ViennaDistrictScalarFieldEnum[]
  }

  /**
   * ViennaDistrict findMany
   */
  export type ViennaDistrictFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter, which ViennaDistricts to fetch.
     */
    where?: ViennaDistrictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViennaDistricts to fetch.
     */
    orderBy?: ViennaDistrictOrderByWithRelationInput | ViennaDistrictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ViennaDistricts.
     */
    cursor?: ViennaDistrictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViennaDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViennaDistricts.
     */
    skip?: number
    distinct?: ViennaDistrictScalarFieldEnum | ViennaDistrictScalarFieldEnum[]
  }

  /**
   * ViennaDistrict create
   */
  export type ViennaDistrictCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * The data needed to create a ViennaDistrict.
     */
    data: XOR<ViennaDistrictCreateInput, ViennaDistrictUncheckedCreateInput>
  }

  /**
   * ViennaDistrict createMany
   */
  export type ViennaDistrictCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ViennaDistricts.
     */
    data: ViennaDistrictCreateManyInput | ViennaDistrictCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ViennaDistrict update
   */
  export type ViennaDistrictUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * The data needed to update a ViennaDistrict.
     */
    data: XOR<ViennaDistrictUpdateInput, ViennaDistrictUncheckedUpdateInput>
    /**
     * Choose, which ViennaDistrict to update.
     */
    where: ViennaDistrictWhereUniqueInput
  }

  /**
   * ViennaDistrict updateMany
   */
  export type ViennaDistrictUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ViennaDistricts.
     */
    data: XOR<ViennaDistrictUpdateManyMutationInput, ViennaDistrictUncheckedUpdateManyInput>
    /**
     * Filter which ViennaDistricts to update
     */
    where?: ViennaDistrictWhereInput
    /**
     * Limit how many ViennaDistricts to update.
     */
    limit?: number
  }

  /**
   * ViennaDistrict upsert
   */
  export type ViennaDistrictUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * The filter to search for the ViennaDistrict to update in case it exists.
     */
    where: ViennaDistrictWhereUniqueInput
    /**
     * In case the ViennaDistrict found by the `where` argument doesn't exist, create a new ViennaDistrict with this data.
     */
    create: XOR<ViennaDistrictCreateInput, ViennaDistrictUncheckedCreateInput>
    /**
     * In case the ViennaDistrict was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ViennaDistrictUpdateInput, ViennaDistrictUncheckedUpdateInput>
  }

  /**
   * ViennaDistrict delete
   */
  export type ViennaDistrictDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
    /**
     * Filter which ViennaDistrict to delete.
     */
    where: ViennaDistrictWhereUniqueInput
  }

  /**
   * ViennaDistrict deleteMany
   */
  export type ViennaDistrictDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ViennaDistricts to delete
     */
    where?: ViennaDistrictWhereInput
    /**
     * Limit how many ViennaDistricts to delete.
     */
    limit?: number
  }

  /**
   * ViennaDistrict.quoteRequests
   */
  export type ViennaDistrict$quoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    cursor?: QuoteRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * ViennaDistrict without action
   */
  export type ViennaDistrictDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViennaDistrict
     */
    select?: ViennaDistrictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViennaDistrict
     */
    omit?: ViennaDistrictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViennaDistrictInclude<ExtArgs> | null
  }


  /**
   * Model SetupChecklistItem
   */

  export type AggregateSetupChecklistItem = {
    _count: SetupChecklistItemCountAggregateOutputType | null
    _min: SetupChecklistItemMinAggregateOutputType | null
    _max: SetupChecklistItemMaxAggregateOutputType | null
  }

  export type SetupChecklistItemMinAggregateOutputType = {
    id: string | null
    itemKey: $Enums.ChecklistItemKey | null
    title: string | null
    subtitle: string | null
    status: $Enums.ChecklistStatus | null
    fieldValue: string | null
    legalRef: string | null
    lastUpdated: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SetupChecklistItemMaxAggregateOutputType = {
    id: string | null
    itemKey: $Enums.ChecklistItemKey | null
    title: string | null
    subtitle: string | null
    status: $Enums.ChecklistStatus | null
    fieldValue: string | null
    legalRef: string | null
    lastUpdated: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SetupChecklistItemCountAggregateOutputType = {
    id: number
    itemKey: number
    title: number
    subtitle: number
    status: number
    fieldValue: number
    legalRef: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SetupChecklistItemMinAggregateInputType = {
    id?: true
    itemKey?: true
    title?: true
    subtitle?: true
    status?: true
    fieldValue?: true
    legalRef?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SetupChecklistItemMaxAggregateInputType = {
    id?: true
    itemKey?: true
    title?: true
    subtitle?: true
    status?: true
    fieldValue?: true
    legalRef?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SetupChecklistItemCountAggregateInputType = {
    id?: true
    itemKey?: true
    title?: true
    subtitle?: true
    status?: true
    fieldValue?: true
    legalRef?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SetupChecklistItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SetupChecklistItem to aggregate.
     */
    where?: SetupChecklistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetupChecklistItems to fetch.
     */
    orderBy?: SetupChecklistItemOrderByWithRelationInput | SetupChecklistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SetupChecklistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetupChecklistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetupChecklistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SetupChecklistItems
    **/
    _count?: true | SetupChecklistItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SetupChecklistItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SetupChecklistItemMaxAggregateInputType
  }

  export type GetSetupChecklistItemAggregateType<T extends SetupChecklistItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSetupChecklistItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetupChecklistItem[P]>
      : GetScalarType<T[P], AggregateSetupChecklistItem[P]>
  }




  export type SetupChecklistItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetupChecklistItemWhereInput
    orderBy?: SetupChecklistItemOrderByWithAggregationInput | SetupChecklistItemOrderByWithAggregationInput[]
    by: SetupChecklistItemScalarFieldEnum[] | SetupChecklistItemScalarFieldEnum
    having?: SetupChecklistItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SetupChecklistItemCountAggregateInputType | true
    _min?: SetupChecklistItemMinAggregateInputType
    _max?: SetupChecklistItemMaxAggregateInputType
  }

  export type SetupChecklistItemGroupByOutputType = {
    id: string
    itemKey: $Enums.ChecklistItemKey
    title: string
    subtitle: string
    status: $Enums.ChecklistStatus
    fieldValue: string
    legalRef: string
    lastUpdated: string
    createdAt: Date
    updatedAt: Date
    _count: SetupChecklistItemCountAggregateOutputType | null
    _min: SetupChecklistItemMinAggregateOutputType | null
    _max: SetupChecklistItemMaxAggregateOutputType | null
  }

  type GetSetupChecklistItemGroupByPayload<T extends SetupChecklistItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SetupChecklistItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SetupChecklistItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SetupChecklistItemGroupByOutputType[P]>
            : GetScalarType<T[P], SetupChecklistItemGroupByOutputType[P]>
        }
      >
    >


  export type SetupChecklistItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemKey?: boolean
    title?: boolean
    subtitle?: boolean
    status?: boolean
    fieldValue?: boolean
    legalRef?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setupChecklistItem"]>



  export type SetupChecklistItemSelectScalar = {
    id?: boolean
    itemKey?: boolean
    title?: boolean
    subtitle?: boolean
    status?: boolean
    fieldValue?: boolean
    legalRef?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SetupChecklistItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itemKey" | "title" | "subtitle" | "status" | "fieldValue" | "legalRef" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["setupChecklistItem"]>

  export type $SetupChecklistItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SetupChecklistItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itemKey: $Enums.ChecklistItemKey
      title: string
      subtitle: string
      status: $Enums.ChecklistStatus
      fieldValue: string
      legalRef: string
      lastUpdated: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["setupChecklistItem"]>
    composites: {}
  }

  type SetupChecklistItemGetPayload<S extends boolean | null | undefined | SetupChecklistItemDefaultArgs> = $Result.GetResult<Prisma.$SetupChecklistItemPayload, S>

  type SetupChecklistItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SetupChecklistItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SetupChecklistItemCountAggregateInputType | true
    }

  export interface SetupChecklistItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SetupChecklistItem'], meta: { name: 'SetupChecklistItem' } }
    /**
     * Find zero or one SetupChecklistItem that matches the filter.
     * @param {SetupChecklistItemFindUniqueArgs} args - Arguments to find a SetupChecklistItem
     * @example
     * // Get one SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SetupChecklistItemFindUniqueArgs>(args: SelectSubset<T, SetupChecklistItemFindUniqueArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SetupChecklistItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SetupChecklistItemFindUniqueOrThrowArgs} args - Arguments to find a SetupChecklistItem
     * @example
     * // Get one SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SetupChecklistItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SetupChecklistItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SetupChecklistItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemFindFirstArgs} args - Arguments to find a SetupChecklistItem
     * @example
     * // Get one SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SetupChecklistItemFindFirstArgs>(args?: SelectSubset<T, SetupChecklistItemFindFirstArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SetupChecklistItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemFindFirstOrThrowArgs} args - Arguments to find a SetupChecklistItem
     * @example
     * // Get one SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SetupChecklistItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SetupChecklistItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SetupChecklistItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SetupChecklistItems
     * const setupChecklistItems = await prisma.setupChecklistItem.findMany()
     * 
     * // Get first 10 SetupChecklistItems
     * const setupChecklistItems = await prisma.setupChecklistItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const setupChecklistItemWithIdOnly = await prisma.setupChecklistItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SetupChecklistItemFindManyArgs>(args?: SelectSubset<T, SetupChecklistItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SetupChecklistItem.
     * @param {SetupChecklistItemCreateArgs} args - Arguments to create a SetupChecklistItem.
     * @example
     * // Create one SetupChecklistItem
     * const SetupChecklistItem = await prisma.setupChecklistItem.create({
     *   data: {
     *     // ... data to create a SetupChecklistItem
     *   }
     * })
     * 
     */
    create<T extends SetupChecklistItemCreateArgs>(args: SelectSubset<T, SetupChecklistItemCreateArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SetupChecklistItems.
     * @param {SetupChecklistItemCreateManyArgs} args - Arguments to create many SetupChecklistItems.
     * @example
     * // Create many SetupChecklistItems
     * const setupChecklistItem = await prisma.setupChecklistItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SetupChecklistItemCreateManyArgs>(args?: SelectSubset<T, SetupChecklistItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SetupChecklistItem.
     * @param {SetupChecklistItemDeleteArgs} args - Arguments to delete one SetupChecklistItem.
     * @example
     * // Delete one SetupChecklistItem
     * const SetupChecklistItem = await prisma.setupChecklistItem.delete({
     *   where: {
     *     // ... filter to delete one SetupChecklistItem
     *   }
     * })
     * 
     */
    delete<T extends SetupChecklistItemDeleteArgs>(args: SelectSubset<T, SetupChecklistItemDeleteArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SetupChecklistItem.
     * @param {SetupChecklistItemUpdateArgs} args - Arguments to update one SetupChecklistItem.
     * @example
     * // Update one SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SetupChecklistItemUpdateArgs>(args: SelectSubset<T, SetupChecklistItemUpdateArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SetupChecklistItems.
     * @param {SetupChecklistItemDeleteManyArgs} args - Arguments to filter SetupChecklistItems to delete.
     * @example
     * // Delete a few SetupChecklistItems
     * const { count } = await prisma.setupChecklistItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SetupChecklistItemDeleteManyArgs>(args?: SelectSubset<T, SetupChecklistItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SetupChecklistItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SetupChecklistItems
     * const setupChecklistItem = await prisma.setupChecklistItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SetupChecklistItemUpdateManyArgs>(args: SelectSubset<T, SetupChecklistItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SetupChecklistItem.
     * @param {SetupChecklistItemUpsertArgs} args - Arguments to update or create a SetupChecklistItem.
     * @example
     * // Update or create a SetupChecklistItem
     * const setupChecklistItem = await prisma.setupChecklistItem.upsert({
     *   create: {
     *     // ... data to create a SetupChecklistItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SetupChecklistItem we want to update
     *   }
     * })
     */
    upsert<T extends SetupChecklistItemUpsertArgs>(args: SelectSubset<T, SetupChecklistItemUpsertArgs<ExtArgs>>): Prisma__SetupChecklistItemClient<$Result.GetResult<Prisma.$SetupChecklistItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SetupChecklistItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemCountArgs} args - Arguments to filter SetupChecklistItems to count.
     * @example
     * // Count the number of SetupChecklistItems
     * const count = await prisma.setupChecklistItem.count({
     *   where: {
     *     // ... the filter for the SetupChecklistItems we want to count
     *   }
     * })
    **/
    count<T extends SetupChecklistItemCountArgs>(
      args?: Subset<T, SetupChecklistItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SetupChecklistItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SetupChecklistItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SetupChecklistItemAggregateArgs>(args: Subset<T, SetupChecklistItemAggregateArgs>): Prisma.PrismaPromise<GetSetupChecklistItemAggregateType<T>>

    /**
     * Group by SetupChecklistItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupChecklistItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SetupChecklistItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SetupChecklistItemGroupByArgs['orderBy'] }
        : { orderBy?: SetupChecklistItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SetupChecklistItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSetupChecklistItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SetupChecklistItem model
   */
  readonly fields: SetupChecklistItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SetupChecklistItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SetupChecklistItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SetupChecklistItem model
   */
  interface SetupChecklistItemFieldRefs {
    readonly id: FieldRef<"SetupChecklistItem", 'String'>
    readonly itemKey: FieldRef<"SetupChecklistItem", 'ChecklistItemKey'>
    readonly title: FieldRef<"SetupChecklistItem", 'String'>
    readonly subtitle: FieldRef<"SetupChecklistItem", 'String'>
    readonly status: FieldRef<"SetupChecklistItem", 'ChecklistStatus'>
    readonly fieldValue: FieldRef<"SetupChecklistItem", 'String'>
    readonly legalRef: FieldRef<"SetupChecklistItem", 'String'>
    readonly lastUpdated: FieldRef<"SetupChecklistItem", 'String'>
    readonly createdAt: FieldRef<"SetupChecklistItem", 'DateTime'>
    readonly updatedAt: FieldRef<"SetupChecklistItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SetupChecklistItem findUnique
   */
  export type SetupChecklistItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter, which SetupChecklistItem to fetch.
     */
    where: SetupChecklistItemWhereUniqueInput
  }

  /**
   * SetupChecklistItem findUniqueOrThrow
   */
  export type SetupChecklistItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter, which SetupChecklistItem to fetch.
     */
    where: SetupChecklistItemWhereUniqueInput
  }

  /**
   * SetupChecklistItem findFirst
   */
  export type SetupChecklistItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter, which SetupChecklistItem to fetch.
     */
    where?: SetupChecklistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetupChecklistItems to fetch.
     */
    orderBy?: SetupChecklistItemOrderByWithRelationInput | SetupChecklistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SetupChecklistItems.
     */
    cursor?: SetupChecklistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetupChecklistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetupChecklistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SetupChecklistItems.
     */
    distinct?: SetupChecklistItemScalarFieldEnum | SetupChecklistItemScalarFieldEnum[]
  }

  /**
   * SetupChecklistItem findFirstOrThrow
   */
  export type SetupChecklistItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter, which SetupChecklistItem to fetch.
     */
    where?: SetupChecklistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetupChecklistItems to fetch.
     */
    orderBy?: SetupChecklistItemOrderByWithRelationInput | SetupChecklistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SetupChecklistItems.
     */
    cursor?: SetupChecklistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetupChecklistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetupChecklistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SetupChecklistItems.
     */
    distinct?: SetupChecklistItemScalarFieldEnum | SetupChecklistItemScalarFieldEnum[]
  }

  /**
   * SetupChecklistItem findMany
   */
  export type SetupChecklistItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter, which SetupChecklistItems to fetch.
     */
    where?: SetupChecklistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetupChecklistItems to fetch.
     */
    orderBy?: SetupChecklistItemOrderByWithRelationInput | SetupChecklistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SetupChecklistItems.
     */
    cursor?: SetupChecklistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetupChecklistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetupChecklistItems.
     */
    skip?: number
    distinct?: SetupChecklistItemScalarFieldEnum | SetupChecklistItemScalarFieldEnum[]
  }

  /**
   * SetupChecklistItem create
   */
  export type SetupChecklistItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * The data needed to create a SetupChecklistItem.
     */
    data: XOR<SetupChecklistItemCreateInput, SetupChecklistItemUncheckedCreateInput>
  }

  /**
   * SetupChecklistItem createMany
   */
  export type SetupChecklistItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SetupChecklistItems.
     */
    data: SetupChecklistItemCreateManyInput | SetupChecklistItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SetupChecklistItem update
   */
  export type SetupChecklistItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * The data needed to update a SetupChecklistItem.
     */
    data: XOR<SetupChecklistItemUpdateInput, SetupChecklistItemUncheckedUpdateInput>
    /**
     * Choose, which SetupChecklistItem to update.
     */
    where: SetupChecklistItemWhereUniqueInput
  }

  /**
   * SetupChecklistItem updateMany
   */
  export type SetupChecklistItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SetupChecklistItems.
     */
    data: XOR<SetupChecklistItemUpdateManyMutationInput, SetupChecklistItemUncheckedUpdateManyInput>
    /**
     * Filter which SetupChecklistItems to update
     */
    where?: SetupChecklistItemWhereInput
    /**
     * Limit how many SetupChecklistItems to update.
     */
    limit?: number
  }

  /**
   * SetupChecklistItem upsert
   */
  export type SetupChecklistItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * The filter to search for the SetupChecklistItem to update in case it exists.
     */
    where: SetupChecklistItemWhereUniqueInput
    /**
     * In case the SetupChecklistItem found by the `where` argument doesn't exist, create a new SetupChecklistItem with this data.
     */
    create: XOR<SetupChecklistItemCreateInput, SetupChecklistItemUncheckedCreateInput>
    /**
     * In case the SetupChecklistItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SetupChecklistItemUpdateInput, SetupChecklistItemUncheckedUpdateInput>
  }

  /**
   * SetupChecklistItem delete
   */
  export type SetupChecklistItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
    /**
     * Filter which SetupChecklistItem to delete.
     */
    where: SetupChecklistItemWhereUniqueInput
  }

  /**
   * SetupChecklistItem deleteMany
   */
  export type SetupChecklistItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SetupChecklistItems to delete
     */
    where?: SetupChecklistItemWhereInput
    /**
     * Limit how many SetupChecklistItems to delete.
     */
    limit?: number
  }

  /**
   * SetupChecklistItem without action
   */
  export type SetupChecklistItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupChecklistItem
     */
    select?: SetupChecklistItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetupChecklistItem
     */
    omit?: SetupChecklistItemOmit<ExtArgs> | null
  }


  /**
   * Model FaqItem
   */

  export type AggregateFaqItem = {
    _count: FaqItemCountAggregateOutputType | null
    _avg: FaqItemAvgAggregateOutputType | null
    _sum: FaqItemSumAggregateOutputType | null
    _min: FaqItemMinAggregateOutputType | null
    _max: FaqItemMaxAggregateOutputType | null
  }

  export type FaqItemAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type FaqItemSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type FaqItemMinAggregateOutputType = {
    id: string | null
    category: $Enums.FaqCategory | null
    questionDe: string | null
    questionEn: string | null
    questionRu: string | null
    answerDe: string | null
    answerEn: string | null
    answerRu: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqItemMaxAggregateOutputType = {
    id: string | null
    category: $Enums.FaqCategory | null
    questionDe: string | null
    questionEn: string | null
    questionRu: string | null
    answerDe: string | null
    answerEn: string | null
    answerRu: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqItemCountAggregateOutputType = {
    id: number
    category: number
    questionDe: number
    questionEn: number
    questionRu: number
    answerDe: number
    answerEn: number
    answerRu: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FaqItemAvgAggregateInputType = {
    displayOrder?: true
  }

  export type FaqItemSumAggregateInputType = {
    displayOrder?: true
  }

  export type FaqItemMinAggregateInputType = {
    id?: true
    category?: true
    questionDe?: true
    questionEn?: true
    questionRu?: true
    answerDe?: true
    answerEn?: true
    answerRu?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqItemMaxAggregateInputType = {
    id?: true
    category?: true
    questionDe?: true
    questionEn?: true
    questionRu?: true
    answerDe?: true
    answerEn?: true
    answerRu?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqItemCountAggregateInputType = {
    id?: true
    category?: true
    questionDe?: true
    questionEn?: true
    questionRu?: true
    answerDe?: true
    answerEn?: true
    answerRu?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FaqItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqItem to aggregate.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FaqItems
    **/
    _count?: true | FaqItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaqItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaqItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaqItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaqItemMaxAggregateInputType
  }

  export type GetFaqItemAggregateType<T extends FaqItemAggregateArgs> = {
        [P in keyof T & keyof AggregateFaqItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaqItem[P]>
      : GetScalarType<T[P], AggregateFaqItem[P]>
  }




  export type FaqItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaqItemWhereInput
    orderBy?: FaqItemOrderByWithAggregationInput | FaqItemOrderByWithAggregationInput[]
    by: FaqItemScalarFieldEnum[] | FaqItemScalarFieldEnum
    having?: FaqItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaqItemCountAggregateInputType | true
    _avg?: FaqItemAvgAggregateInputType
    _sum?: FaqItemSumAggregateInputType
    _min?: FaqItemMinAggregateInputType
    _max?: FaqItemMaxAggregateInputType
  }

  export type FaqItemGroupByOutputType = {
    id: string
    category: $Enums.FaqCategory
    questionDe: string
    questionEn: string
    questionRu: string
    answerDe: string
    answerEn: string
    answerRu: string
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    _count: FaqItemCountAggregateOutputType | null
    _avg: FaqItemAvgAggregateOutputType | null
    _sum: FaqItemSumAggregateOutputType | null
    _min: FaqItemMinAggregateOutputType | null
    _max: FaqItemMaxAggregateOutputType | null
  }

  type GetFaqItemGroupByPayload<T extends FaqItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaqItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaqItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaqItemGroupByOutputType[P]>
            : GetScalarType<T[P], FaqItemGroupByOutputType[P]>
        }
      >
    >


  export type FaqItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    questionDe?: boolean
    questionEn?: boolean
    questionRu?: boolean
    answerDe?: boolean
    answerEn?: boolean
    answerRu?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["faqItem"]>



  export type FaqItemSelectScalar = {
    id?: boolean
    category?: boolean
    questionDe?: boolean
    questionEn?: boolean
    questionRu?: boolean
    answerDe?: boolean
    answerEn?: boolean
    answerRu?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FaqItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "questionDe" | "questionEn" | "questionRu" | "answerDe" | "answerEn" | "answerRu" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["faqItem"]>

  export type $FaqItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FaqItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: $Enums.FaqCategory
      questionDe: string
      questionEn: string
      questionRu: string
      answerDe: string
      answerEn: string
      answerRu: string
      displayOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["faqItem"]>
    composites: {}
  }

  type FaqItemGetPayload<S extends boolean | null | undefined | FaqItemDefaultArgs> = $Result.GetResult<Prisma.$FaqItemPayload, S>

  type FaqItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FaqItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FaqItemCountAggregateInputType | true
    }

  export interface FaqItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FaqItem'], meta: { name: 'FaqItem' } }
    /**
     * Find zero or one FaqItem that matches the filter.
     * @param {FaqItemFindUniqueArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaqItemFindUniqueArgs>(args: SelectSubset<T, FaqItemFindUniqueArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FaqItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FaqItemFindUniqueOrThrowArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaqItemFindUniqueOrThrowArgs>(args: SelectSubset<T, FaqItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FaqItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindFirstArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaqItemFindFirstArgs>(args?: SelectSubset<T, FaqItemFindFirstArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FaqItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindFirstOrThrowArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaqItemFindFirstOrThrowArgs>(args?: SelectSubset<T, FaqItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FaqItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FaqItems
     * const faqItems = await prisma.faqItem.findMany()
     * 
     * // Get first 10 FaqItems
     * const faqItems = await prisma.faqItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faqItemWithIdOnly = await prisma.faqItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaqItemFindManyArgs>(args?: SelectSubset<T, FaqItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FaqItem.
     * @param {FaqItemCreateArgs} args - Arguments to create a FaqItem.
     * @example
     * // Create one FaqItem
     * const FaqItem = await prisma.faqItem.create({
     *   data: {
     *     // ... data to create a FaqItem
     *   }
     * })
     * 
     */
    create<T extends FaqItemCreateArgs>(args: SelectSubset<T, FaqItemCreateArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FaqItems.
     * @param {FaqItemCreateManyArgs} args - Arguments to create many FaqItems.
     * @example
     * // Create many FaqItems
     * const faqItem = await prisma.faqItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaqItemCreateManyArgs>(args?: SelectSubset<T, FaqItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FaqItem.
     * @param {FaqItemDeleteArgs} args - Arguments to delete one FaqItem.
     * @example
     * // Delete one FaqItem
     * const FaqItem = await prisma.faqItem.delete({
     *   where: {
     *     // ... filter to delete one FaqItem
     *   }
     * })
     * 
     */
    delete<T extends FaqItemDeleteArgs>(args: SelectSubset<T, FaqItemDeleteArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FaqItem.
     * @param {FaqItemUpdateArgs} args - Arguments to update one FaqItem.
     * @example
     * // Update one FaqItem
     * const faqItem = await prisma.faqItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaqItemUpdateArgs>(args: SelectSubset<T, FaqItemUpdateArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FaqItems.
     * @param {FaqItemDeleteManyArgs} args - Arguments to filter FaqItems to delete.
     * @example
     * // Delete a few FaqItems
     * const { count } = await prisma.faqItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaqItemDeleteManyArgs>(args?: SelectSubset<T, FaqItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FaqItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FaqItems
     * const faqItem = await prisma.faqItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaqItemUpdateManyArgs>(args: SelectSubset<T, FaqItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FaqItem.
     * @param {FaqItemUpsertArgs} args - Arguments to update or create a FaqItem.
     * @example
     * // Update or create a FaqItem
     * const faqItem = await prisma.faqItem.upsert({
     *   create: {
     *     // ... data to create a FaqItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FaqItem we want to update
     *   }
     * })
     */
    upsert<T extends FaqItemUpsertArgs>(args: SelectSubset<T, FaqItemUpsertArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FaqItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemCountArgs} args - Arguments to filter FaqItems to count.
     * @example
     * // Count the number of FaqItems
     * const count = await prisma.faqItem.count({
     *   where: {
     *     // ... the filter for the FaqItems we want to count
     *   }
     * })
    **/
    count<T extends FaqItemCountArgs>(
      args?: Subset<T, FaqItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaqItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FaqItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FaqItemAggregateArgs>(args: Subset<T, FaqItemAggregateArgs>): Prisma.PrismaPromise<GetFaqItemAggregateType<T>>

    /**
     * Group by FaqItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FaqItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaqItemGroupByArgs['orderBy'] }
        : { orderBy?: FaqItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FaqItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaqItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FaqItem model
   */
  readonly fields: FaqItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FaqItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaqItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FaqItem model
   */
  interface FaqItemFieldRefs {
    readonly id: FieldRef<"FaqItem", 'String'>
    readonly category: FieldRef<"FaqItem", 'FaqCategory'>
    readonly questionDe: FieldRef<"FaqItem", 'String'>
    readonly questionEn: FieldRef<"FaqItem", 'String'>
    readonly questionRu: FieldRef<"FaqItem", 'String'>
    readonly answerDe: FieldRef<"FaqItem", 'String'>
    readonly answerEn: FieldRef<"FaqItem", 'String'>
    readonly answerRu: FieldRef<"FaqItem", 'String'>
    readonly displayOrder: FieldRef<"FaqItem", 'Int'>
    readonly createdAt: FieldRef<"FaqItem", 'DateTime'>
    readonly updatedAt: FieldRef<"FaqItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FaqItem findUnique
   */
  export type FaqItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem findUniqueOrThrow
   */
  export type FaqItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem findFirst
   */
  export type FaqItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqItems.
     */
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem findFirstOrThrow
   */
  export type FaqItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqItems.
     */
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem findMany
   */
  export type FaqItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter, which FaqItems to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem create
   */
  export type FaqItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * The data needed to create a FaqItem.
     */
    data: XOR<FaqItemCreateInput, FaqItemUncheckedCreateInput>
  }

  /**
   * FaqItem createMany
   */
  export type FaqItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FaqItems.
     */
    data: FaqItemCreateManyInput | FaqItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FaqItem update
   */
  export type FaqItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * The data needed to update a FaqItem.
     */
    data: XOR<FaqItemUpdateInput, FaqItemUncheckedUpdateInput>
    /**
     * Choose, which FaqItem to update.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem updateMany
   */
  export type FaqItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FaqItems.
     */
    data: XOR<FaqItemUpdateManyMutationInput, FaqItemUncheckedUpdateManyInput>
    /**
     * Filter which FaqItems to update
     */
    where?: FaqItemWhereInput
    /**
     * Limit how many FaqItems to update.
     */
    limit?: number
  }

  /**
   * FaqItem upsert
   */
  export type FaqItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * The filter to search for the FaqItem to update in case it exists.
     */
    where: FaqItemWhereUniqueInput
    /**
     * In case the FaqItem found by the `where` argument doesn't exist, create a new FaqItem with this data.
     */
    create: XOR<FaqItemCreateInput, FaqItemUncheckedCreateInput>
    /**
     * In case the FaqItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaqItemUpdateInput, FaqItemUncheckedUpdateInput>
  }

  /**
   * FaqItem delete
   */
  export type FaqItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
    /**
     * Filter which FaqItem to delete.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem deleteMany
   */
  export type FaqItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqItems to delete
     */
    where?: FaqItemWhereInput
    /**
     * Limit how many FaqItems to delete.
     */
    limit?: number
  }

  /**
   * FaqItem without action
   */
  export type FaqItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FaqItem
     */
    omit?: FaqItemOmit<ExtArgs> | null
  }


  /**
   * Model QuoteRequest
   */

  export type AggregateQuoteRequest = {
    _count: QuoteRequestCountAggregateOutputType | null
    _avg: QuoteRequestAvgAggregateOutputType | null
    _sum: QuoteRequestSumAggregateOutputType | null
    _min: QuoteRequestMinAggregateOutputType | null
    _max: QuoteRequestMaxAggregateOutputType | null
  }

  export type QuoteRequestAvgAggregateOutputType = {
    estimatedHours: number | null
    estimatedBudgetEur: Decimal | null
  }

  export type QuoteRequestSumAggregateOutputType = {
    estimatedHours: number | null
    estimatedBudgetEur: Decimal | null
  }

  export type QuoteRequestMinAggregateOutputType = {
    id: string | null
    trackingCode: string | null
    customerId: string | null
    clientName: string | null
    clientPhone: string | null
    clientEmail: string | null
    serviceCategoryId: string | null
    districtId: string | null
    addressSnippet: string | null
    taskTitle: string | null
    taskDescription: string | null
    estimatedHours: number | null
    estimatedBudgetEur: Decimal | null
    preferredDate: string | null
    preferredTimeSlot: $Enums.PreferredTimeSlot | null
    hasMaterials: boolean | null
    agreedToTerms: boolean | null
    submissionLang: $Enums.SubmissionLanguage | null
    isUrgent: boolean | null
    status: $Enums.QuoteStatus | null
    createdAtFormatted: string | null
    scopeNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteRequestMaxAggregateOutputType = {
    id: string | null
    trackingCode: string | null
    customerId: string | null
    clientName: string | null
    clientPhone: string | null
    clientEmail: string | null
    serviceCategoryId: string | null
    districtId: string | null
    addressSnippet: string | null
    taskTitle: string | null
    taskDescription: string | null
    estimatedHours: number | null
    estimatedBudgetEur: Decimal | null
    preferredDate: string | null
    preferredTimeSlot: $Enums.PreferredTimeSlot | null
    hasMaterials: boolean | null
    agreedToTerms: boolean | null
    submissionLang: $Enums.SubmissionLanguage | null
    isUrgent: boolean | null
    status: $Enums.QuoteStatus | null
    createdAtFormatted: string | null
    scopeNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteRequestCountAggregateOutputType = {
    id: number
    trackingCode: number
    customerId: number
    clientName: number
    clientPhone: number
    clientEmail: number
    serviceCategoryId: number
    districtId: number
    addressSnippet: number
    taskTitle: number
    taskDescription: number
    estimatedHours: number
    estimatedBudgetEur: number
    preferredDate: number
    preferredTimeSlot: number
    hasMaterials: number
    agreedToTerms: number
    submissionLang: number
    isUrgent: number
    status: number
    createdAtFormatted: number
    scopeNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuoteRequestAvgAggregateInputType = {
    estimatedHours?: true
    estimatedBudgetEur?: true
  }

  export type QuoteRequestSumAggregateInputType = {
    estimatedHours?: true
    estimatedBudgetEur?: true
  }

  export type QuoteRequestMinAggregateInputType = {
    id?: true
    trackingCode?: true
    customerId?: true
    clientName?: true
    clientPhone?: true
    clientEmail?: true
    serviceCategoryId?: true
    districtId?: true
    addressSnippet?: true
    taskTitle?: true
    taskDescription?: true
    estimatedHours?: true
    estimatedBudgetEur?: true
    preferredDate?: true
    preferredTimeSlot?: true
    hasMaterials?: true
    agreedToTerms?: true
    submissionLang?: true
    isUrgent?: true
    status?: true
    createdAtFormatted?: true
    scopeNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteRequestMaxAggregateInputType = {
    id?: true
    trackingCode?: true
    customerId?: true
    clientName?: true
    clientPhone?: true
    clientEmail?: true
    serviceCategoryId?: true
    districtId?: true
    addressSnippet?: true
    taskTitle?: true
    taskDescription?: true
    estimatedHours?: true
    estimatedBudgetEur?: true
    preferredDate?: true
    preferredTimeSlot?: true
    hasMaterials?: true
    agreedToTerms?: true
    submissionLang?: true
    isUrgent?: true
    status?: true
    createdAtFormatted?: true
    scopeNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteRequestCountAggregateInputType = {
    id?: true
    trackingCode?: true
    customerId?: true
    clientName?: true
    clientPhone?: true
    clientEmail?: true
    serviceCategoryId?: true
    districtId?: true
    addressSnippet?: true
    taskTitle?: true
    taskDescription?: true
    estimatedHours?: true
    estimatedBudgetEur?: true
    preferredDate?: true
    preferredTimeSlot?: true
    hasMaterials?: true
    agreedToTerms?: true
    submissionLang?: true
    isUrgent?: true
    status?: true
    createdAtFormatted?: true
    scopeNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuoteRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuoteRequest to aggregate.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuoteRequests
    **/
    _count?: true | QuoteRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuoteRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuoteRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuoteRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuoteRequestMaxAggregateInputType
  }

  export type GetQuoteRequestAggregateType<T extends QuoteRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateQuoteRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuoteRequest[P]>
      : GetScalarType<T[P], AggregateQuoteRequest[P]>
  }




  export type QuoteRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithAggregationInput | QuoteRequestOrderByWithAggregationInput[]
    by: QuoteRequestScalarFieldEnum[] | QuoteRequestScalarFieldEnum
    having?: QuoteRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuoteRequestCountAggregateInputType | true
    _avg?: QuoteRequestAvgAggregateInputType
    _sum?: QuoteRequestSumAggregateInputType
    _min?: QuoteRequestMinAggregateInputType
    _max?: QuoteRequestMaxAggregateInputType
  }

  export type QuoteRequestGroupByOutputType = {
    id: string
    trackingCode: string
    customerId: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal
    preferredDate: string
    preferredTimeSlot: $Enums.PreferredTimeSlot
    hasMaterials: boolean
    agreedToTerms: boolean
    submissionLang: $Enums.SubmissionLanguage
    isUrgent: boolean
    status: $Enums.QuoteStatus
    createdAtFormatted: string | null
    scopeNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: QuoteRequestCountAggregateOutputType | null
    _avg: QuoteRequestAvgAggregateOutputType | null
    _sum: QuoteRequestSumAggregateOutputType | null
    _min: QuoteRequestMinAggregateOutputType | null
    _max: QuoteRequestMaxAggregateOutputType | null
  }

  type GetQuoteRequestGroupByPayload<T extends QuoteRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuoteRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuoteRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuoteRequestGroupByOutputType[P]>
            : GetScalarType<T[P], QuoteRequestGroupByOutputType[P]>
        }
      >
    >


  export type QuoteRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trackingCode?: boolean
    customerId?: boolean
    clientName?: boolean
    clientPhone?: boolean
    clientEmail?: boolean
    serviceCategoryId?: boolean
    districtId?: boolean
    addressSnippet?: boolean
    taskTitle?: boolean
    taskDescription?: boolean
    estimatedHours?: boolean
    estimatedBudgetEur?: boolean
    preferredDate?: boolean
    preferredTimeSlot?: boolean
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: boolean
    isUrgent?: boolean
    status?: boolean
    createdAtFormatted?: boolean
    scopeNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | QuoteRequest$customerArgs<ExtArgs>
    serviceCategory?: boolean | ServiceCategoryDefaultArgs<ExtArgs>
    district?: boolean | ViennaDistrictDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quoteRequest"]>



  export type QuoteRequestSelectScalar = {
    id?: boolean
    trackingCode?: boolean
    customerId?: boolean
    clientName?: boolean
    clientPhone?: boolean
    clientEmail?: boolean
    serviceCategoryId?: boolean
    districtId?: boolean
    addressSnippet?: boolean
    taskTitle?: boolean
    taskDescription?: boolean
    estimatedHours?: boolean
    estimatedBudgetEur?: boolean
    preferredDate?: boolean
    preferredTimeSlot?: boolean
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: boolean
    isUrgent?: boolean
    status?: boolean
    createdAtFormatted?: boolean
    scopeNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuoteRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trackingCode" | "customerId" | "clientName" | "clientPhone" | "clientEmail" | "serviceCategoryId" | "districtId" | "addressSnippet" | "taskTitle" | "taskDescription" | "estimatedHours" | "estimatedBudgetEur" | "preferredDate" | "preferredTimeSlot" | "hasMaterials" | "agreedToTerms" | "submissionLang" | "isUrgent" | "status" | "createdAtFormatted" | "scopeNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["quoteRequest"]>
  export type QuoteRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | QuoteRequest$customerArgs<ExtArgs>
    serviceCategory?: boolean | ServiceCategoryDefaultArgs<ExtArgs>
    district?: boolean | ViennaDistrictDefaultArgs<ExtArgs>
  }

  export type $QuoteRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuoteRequest"
    objects: {
      customer: Prisma.$AccountUserPayload<ExtArgs> | null
      serviceCategory: Prisma.$ServiceCategoryPayload<ExtArgs>
      district: Prisma.$ViennaDistrictPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trackingCode: string
      customerId: string | null
      clientName: string
      clientPhone: string
      clientEmail: string
      serviceCategoryId: string
      districtId: string
      addressSnippet: string
      taskTitle: string
      taskDescription: string
      estimatedHours: number
      estimatedBudgetEur: Prisma.Decimal
      preferredDate: string
      preferredTimeSlot: $Enums.PreferredTimeSlot
      hasMaterials: boolean
      agreedToTerms: boolean
      submissionLang: $Enums.SubmissionLanguage
      isUrgent: boolean
      status: $Enums.QuoteStatus
      createdAtFormatted: string | null
      scopeNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quoteRequest"]>
    composites: {}
  }

  type QuoteRequestGetPayload<S extends boolean | null | undefined | QuoteRequestDefaultArgs> = $Result.GetResult<Prisma.$QuoteRequestPayload, S>

  type QuoteRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuoteRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuoteRequestCountAggregateInputType | true
    }

  export interface QuoteRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuoteRequest'], meta: { name: 'QuoteRequest' } }
    /**
     * Find zero or one QuoteRequest that matches the filter.
     * @param {QuoteRequestFindUniqueArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuoteRequestFindUniqueArgs>(args: SelectSubset<T, QuoteRequestFindUniqueArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuoteRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuoteRequestFindUniqueOrThrowArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuoteRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, QuoteRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuoteRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindFirstArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuoteRequestFindFirstArgs>(args?: SelectSubset<T, QuoteRequestFindFirstArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuoteRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindFirstOrThrowArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuoteRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, QuoteRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuoteRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuoteRequests
     * const quoteRequests = await prisma.quoteRequest.findMany()
     * 
     * // Get first 10 QuoteRequests
     * const quoteRequests = await prisma.quoteRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quoteRequestWithIdOnly = await prisma.quoteRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuoteRequestFindManyArgs>(args?: SelectSubset<T, QuoteRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuoteRequest.
     * @param {QuoteRequestCreateArgs} args - Arguments to create a QuoteRequest.
     * @example
     * // Create one QuoteRequest
     * const QuoteRequest = await prisma.quoteRequest.create({
     *   data: {
     *     // ... data to create a QuoteRequest
     *   }
     * })
     * 
     */
    create<T extends QuoteRequestCreateArgs>(args: SelectSubset<T, QuoteRequestCreateArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuoteRequests.
     * @param {QuoteRequestCreateManyArgs} args - Arguments to create many QuoteRequests.
     * @example
     * // Create many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuoteRequestCreateManyArgs>(args?: SelectSubset<T, QuoteRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QuoteRequest.
     * @param {QuoteRequestDeleteArgs} args - Arguments to delete one QuoteRequest.
     * @example
     * // Delete one QuoteRequest
     * const QuoteRequest = await prisma.quoteRequest.delete({
     *   where: {
     *     // ... filter to delete one QuoteRequest
     *   }
     * })
     * 
     */
    delete<T extends QuoteRequestDeleteArgs>(args: SelectSubset<T, QuoteRequestDeleteArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuoteRequest.
     * @param {QuoteRequestUpdateArgs} args - Arguments to update one QuoteRequest.
     * @example
     * // Update one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuoteRequestUpdateArgs>(args: SelectSubset<T, QuoteRequestUpdateArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuoteRequests.
     * @param {QuoteRequestDeleteManyArgs} args - Arguments to filter QuoteRequests to delete.
     * @example
     * // Delete a few QuoteRequests
     * const { count } = await prisma.quoteRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuoteRequestDeleteManyArgs>(args?: SelectSubset<T, QuoteRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuoteRequestUpdateManyArgs>(args: SelectSubset<T, QuoteRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuoteRequest.
     * @param {QuoteRequestUpsertArgs} args - Arguments to update or create a QuoteRequest.
     * @example
     * // Update or create a QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.upsert({
     *   create: {
     *     // ... data to create a QuoteRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuoteRequest we want to update
     *   }
     * })
     */
    upsert<T extends QuoteRequestUpsertArgs>(args: SelectSubset<T, QuoteRequestUpsertArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestCountArgs} args - Arguments to filter QuoteRequests to count.
     * @example
     * // Count the number of QuoteRequests
     * const count = await prisma.quoteRequest.count({
     *   where: {
     *     // ... the filter for the QuoteRequests we want to count
     *   }
     * })
    **/
    count<T extends QuoteRequestCountArgs>(
      args?: Subset<T, QuoteRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuoteRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuoteRequestAggregateArgs>(args: Subset<T, QuoteRequestAggregateArgs>): Prisma.PrismaPromise<GetQuoteRequestAggregateType<T>>

    /**
     * Group by QuoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuoteRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuoteRequestGroupByArgs['orderBy'] }
        : { orderBy?: QuoteRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuoteRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuoteRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuoteRequest model
   */
  readonly fields: QuoteRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuoteRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuoteRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends QuoteRequest$customerArgs<ExtArgs> = {}>(args?: Subset<T, QuoteRequest$customerArgs<ExtArgs>>): Prisma__AccountUserClient<$Result.GetResult<Prisma.$AccountUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    serviceCategory<T extends ServiceCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceCategoryDefaultArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    district<T extends ViennaDistrictDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ViennaDistrictDefaultArgs<ExtArgs>>): Prisma__ViennaDistrictClient<$Result.GetResult<Prisma.$ViennaDistrictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuoteRequest model
   */
  interface QuoteRequestFieldRefs {
    readonly id: FieldRef<"QuoteRequest", 'String'>
    readonly trackingCode: FieldRef<"QuoteRequest", 'String'>
    readonly customerId: FieldRef<"QuoteRequest", 'String'>
    readonly clientName: FieldRef<"QuoteRequest", 'String'>
    readonly clientPhone: FieldRef<"QuoteRequest", 'String'>
    readonly clientEmail: FieldRef<"QuoteRequest", 'String'>
    readonly serviceCategoryId: FieldRef<"QuoteRequest", 'String'>
    readonly districtId: FieldRef<"QuoteRequest", 'String'>
    readonly addressSnippet: FieldRef<"QuoteRequest", 'String'>
    readonly taskTitle: FieldRef<"QuoteRequest", 'String'>
    readonly taskDescription: FieldRef<"QuoteRequest", 'String'>
    readonly estimatedHours: FieldRef<"QuoteRequest", 'Int'>
    readonly estimatedBudgetEur: FieldRef<"QuoteRequest", 'Decimal'>
    readonly preferredDate: FieldRef<"QuoteRequest", 'String'>
    readonly preferredTimeSlot: FieldRef<"QuoteRequest", 'PreferredTimeSlot'>
    readonly hasMaterials: FieldRef<"QuoteRequest", 'Boolean'>
    readonly agreedToTerms: FieldRef<"QuoteRequest", 'Boolean'>
    readonly submissionLang: FieldRef<"QuoteRequest", 'SubmissionLanguage'>
    readonly isUrgent: FieldRef<"QuoteRequest", 'Boolean'>
    readonly status: FieldRef<"QuoteRequest", 'QuoteStatus'>
    readonly createdAtFormatted: FieldRef<"QuoteRequest", 'String'>
    readonly scopeNotes: FieldRef<"QuoteRequest", 'String'>
    readonly createdAt: FieldRef<"QuoteRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"QuoteRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuoteRequest findUnique
   */
  export type QuoteRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest findUniqueOrThrow
   */
  export type QuoteRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest findFirst
   */
  export type QuoteRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuoteRequests.
     */
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest findFirstOrThrow
   */
  export type QuoteRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuoteRequests.
     */
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest findMany
   */
  export type QuoteRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequests to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest create
   */
  export type QuoteRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a QuoteRequest.
     */
    data: XOR<QuoteRequestCreateInput, QuoteRequestUncheckedCreateInput>
  }

  /**
   * QuoteRequest createMany
   */
  export type QuoteRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuoteRequests.
     */
    data: QuoteRequestCreateManyInput | QuoteRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuoteRequest update
   */
  export type QuoteRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a QuoteRequest.
     */
    data: XOR<QuoteRequestUpdateInput, QuoteRequestUncheckedUpdateInput>
    /**
     * Choose, which QuoteRequest to update.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest updateMany
   */
  export type QuoteRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuoteRequests.
     */
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyInput>
    /**
     * Filter which QuoteRequests to update
     */
    where?: QuoteRequestWhereInput
    /**
     * Limit how many QuoteRequests to update.
     */
    limit?: number
  }

  /**
   * QuoteRequest upsert
   */
  export type QuoteRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the QuoteRequest to update in case it exists.
     */
    where: QuoteRequestWhereUniqueInput
    /**
     * In case the QuoteRequest found by the `where` argument doesn't exist, create a new QuoteRequest with this data.
     */
    create: XOR<QuoteRequestCreateInput, QuoteRequestUncheckedCreateInput>
    /**
     * In case the QuoteRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuoteRequestUpdateInput, QuoteRequestUncheckedUpdateInput>
  }

  /**
   * QuoteRequest delete
   */
  export type QuoteRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter which QuoteRequest to delete.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest deleteMany
   */
  export type QuoteRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuoteRequests to delete
     */
    where?: QuoteRequestWhereInput
    /**
     * Limit how many QuoteRequests to delete.
     */
    limit?: number
  }

  /**
   * QuoteRequest.customer
   */
  export type QuoteRequest$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountUser
     */
    select?: AccountUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountUser
     */
    omit?: AccountUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountUserInclude<ExtArgs> | null
    where?: AccountUserWhereInput
  }

  /**
   * QuoteRequest without action
   */
  export type QuoteRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    fullName: 'fullName',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountUserScalarFieldEnum = (typeof AccountUserScalarFieldEnum)[keyof typeof AccountUserScalarFieldEnum]


  export const ServiceCategoryScalarFieldEnum: {
    id: 'id',
    key: 'key',
    titleDe: 'titleDe',
    titleEn: 'titleEn',
    titleRu: 'titleRu',
    baselineHourlyRate: 'baselineHourlyRate',
    typicalRangeEur: 'typicalRangeEur',
    craftClassification: 'craftClassification',
    leadArtisan: 'leadArtisan',
    isFeatured: 'isFeatured',
    descriptionDe: 'descriptionDe',
    descriptionEn: 'descriptionEn',
    descriptionRu: 'descriptionRu',
    imageUrl: 'imageUrl',
    iconName: 'iconName',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceCategoryScalarFieldEnum = (typeof ServiceCategoryScalarFieldEnum)[keyof typeof ServiceCategoryScalarFieldEnum]


  export const ViennaDistrictScalarFieldEnum: {
    id: 'id',
    districtCode: 'districtCode',
    districtName: 'districtName',
    districtNumber: 'districtNumber',
    zone: 'zone',
    leadTimeHours: 'leadTimeHours',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ViennaDistrictScalarFieldEnum = (typeof ViennaDistrictScalarFieldEnum)[keyof typeof ViennaDistrictScalarFieldEnum]


  export const SetupChecklistItemScalarFieldEnum: {
    id: 'id',
    itemKey: 'itemKey',
    title: 'title',
    subtitle: 'subtitle',
    status: 'status',
    fieldValue: 'fieldValue',
    legalRef: 'legalRef',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SetupChecklistItemScalarFieldEnum = (typeof SetupChecklistItemScalarFieldEnum)[keyof typeof SetupChecklistItemScalarFieldEnum]


  export const FaqItemScalarFieldEnum: {
    id: 'id',
    category: 'category',
    questionDe: 'questionDe',
    questionEn: 'questionEn',
    questionRu: 'questionRu',
    answerDe: 'answerDe',
    answerEn: 'answerEn',
    answerRu: 'answerRu',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FaqItemScalarFieldEnum = (typeof FaqItemScalarFieldEnum)[keyof typeof FaqItemScalarFieldEnum]


  export const QuoteRequestScalarFieldEnum: {
    id: 'id',
    trackingCode: 'trackingCode',
    customerId: 'customerId',
    clientName: 'clientName',
    clientPhone: 'clientPhone',
    clientEmail: 'clientEmail',
    serviceCategoryId: 'serviceCategoryId',
    districtId: 'districtId',
    addressSnippet: 'addressSnippet',
    taskTitle: 'taskTitle',
    taskDescription: 'taskDescription',
    estimatedHours: 'estimatedHours',
    estimatedBudgetEur: 'estimatedBudgetEur',
    preferredDate: 'preferredDate',
    preferredTimeSlot: 'preferredTimeSlot',
    hasMaterials: 'hasMaterials',
    agreedToTerms: 'agreedToTerms',
    submissionLang: 'submissionLang',
    isUrgent: 'isUrgent',
    status: 'status',
    createdAtFormatted: 'createdAtFormatted',
    scopeNotes: 'scopeNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuoteRequestScalarFieldEnum = (typeof QuoteRequestScalarFieldEnum)[keyof typeof QuoteRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AccountUserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    phone: 'phone'
  };

  export type AccountUserOrderByRelevanceFieldEnum = (typeof AccountUserOrderByRelevanceFieldEnum)[keyof typeof AccountUserOrderByRelevanceFieldEnum]


  export const ServiceCategoryOrderByRelevanceFieldEnum: {
    id: 'id',
    titleDe: 'titleDe',
    titleEn: 'titleEn',
    titleRu: 'titleRu',
    typicalRangeEur: 'typicalRangeEur',
    leadArtisan: 'leadArtisan',
    descriptionDe: 'descriptionDe',
    descriptionEn: 'descriptionEn',
    descriptionRu: 'descriptionRu',
    imageUrl: 'imageUrl',
    iconName: 'iconName'
  };

  export type ServiceCategoryOrderByRelevanceFieldEnum = (typeof ServiceCategoryOrderByRelevanceFieldEnum)[keyof typeof ServiceCategoryOrderByRelevanceFieldEnum]


  export const ViennaDistrictOrderByRelevanceFieldEnum: {
    id: 'id',
    districtCode: 'districtCode',
    districtName: 'districtName'
  };

  export type ViennaDistrictOrderByRelevanceFieldEnum = (typeof ViennaDistrictOrderByRelevanceFieldEnum)[keyof typeof ViennaDistrictOrderByRelevanceFieldEnum]


  export const SetupChecklistItemOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    subtitle: 'subtitle',
    fieldValue: 'fieldValue',
    legalRef: 'legalRef',
    lastUpdated: 'lastUpdated'
  };

  export type SetupChecklistItemOrderByRelevanceFieldEnum = (typeof SetupChecklistItemOrderByRelevanceFieldEnum)[keyof typeof SetupChecklistItemOrderByRelevanceFieldEnum]


  export const FaqItemOrderByRelevanceFieldEnum: {
    id: 'id',
    questionDe: 'questionDe',
    questionEn: 'questionEn',
    questionRu: 'questionRu',
    answerDe: 'answerDe',
    answerEn: 'answerEn',
    answerRu: 'answerRu'
  };

  export type FaqItemOrderByRelevanceFieldEnum = (typeof FaqItemOrderByRelevanceFieldEnum)[keyof typeof FaqItemOrderByRelevanceFieldEnum]


  export const QuoteRequestOrderByRelevanceFieldEnum: {
    id: 'id',
    trackingCode: 'trackingCode',
    customerId: 'customerId',
    clientName: 'clientName',
    clientPhone: 'clientPhone',
    clientEmail: 'clientEmail',
    serviceCategoryId: 'serviceCategoryId',
    districtId: 'districtId',
    addressSnippet: 'addressSnippet',
    taskTitle: 'taskTitle',
    taskDescription: 'taskDescription',
    preferredDate: 'preferredDate',
    createdAtFormatted: 'createdAtFormatted',
    scopeNotes: 'scopeNotes'
  };

  export type QuoteRequestOrderByRelevanceFieldEnum = (typeof QuoteRequestOrderByRelevanceFieldEnum)[keyof typeof QuoteRequestOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'AccountUserRole'
   */
  export type EnumAccountUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountUserRole'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'ServiceCategoryKey'
   */
  export type EnumServiceCategoryKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategoryKey'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'CraftClassification'
   */
  export type EnumCraftClassificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CraftClassification'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'LogisticsZone'
   */
  export type EnumLogisticsZoneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsZone'>
    


  /**
   * Reference to a field of type 'ChecklistItemKey'
   */
  export type EnumChecklistItemKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChecklistItemKey'>
    


  /**
   * Reference to a field of type 'ChecklistStatus'
   */
  export type EnumChecklistStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChecklistStatus'>
    


  /**
   * Reference to a field of type 'FaqCategory'
   */
  export type EnumFaqCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FaqCategory'>
    


  /**
   * Reference to a field of type 'PreferredTimeSlot'
   */
  export type EnumPreferredTimeSlotFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PreferredTimeSlot'>
    


  /**
   * Reference to a field of type 'SubmissionLanguage'
   */
  export type EnumSubmissionLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionLanguage'>
    


  /**
   * Reference to a field of type 'QuoteStatus'
   */
  export type EnumQuoteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuoteStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AccountUserWhereInput = {
    AND?: AccountUserWhereInput | AccountUserWhereInput[]
    OR?: AccountUserWhereInput[]
    NOT?: AccountUserWhereInput | AccountUserWhereInput[]
    id?: StringFilter<"AccountUser"> | string
    email?: StringFilter<"AccountUser"> | string
    passwordHash?: StringFilter<"AccountUser"> | string
    role?: EnumAccountUserRoleFilter<"AccountUser"> | $Enums.AccountUserRole
    fullName?: StringFilter<"AccountUser"> | string
    phone?: StringNullableFilter<"AccountUser"> | string | null
    createdAt?: DateTimeFilter<"AccountUser"> | Date | string
    updatedAt?: DateTimeFilter<"AccountUser"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }

  export type AccountUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quoteRequests?: QuoteRequestOrderByRelationAggregateInput
    _relevance?: AccountUserOrderByRelevanceInput
  }

  export type AccountUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AccountUserWhereInput | AccountUserWhereInput[]
    OR?: AccountUserWhereInput[]
    NOT?: AccountUserWhereInput | AccountUserWhereInput[]
    passwordHash?: StringFilter<"AccountUser"> | string
    role?: EnumAccountUserRoleFilter<"AccountUser"> | $Enums.AccountUserRole
    fullName?: StringFilter<"AccountUser"> | string
    phone?: StringNullableFilter<"AccountUser"> | string | null
    createdAt?: DateTimeFilter<"AccountUser"> | Date | string
    updatedAt?: DateTimeFilter<"AccountUser"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }, "id" | "email">

  export type AccountUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountUserCountOrderByAggregateInput
    _max?: AccountUserMaxOrderByAggregateInput
    _min?: AccountUserMinOrderByAggregateInput
  }

  export type AccountUserScalarWhereWithAggregatesInput = {
    AND?: AccountUserScalarWhereWithAggregatesInput | AccountUserScalarWhereWithAggregatesInput[]
    OR?: AccountUserScalarWhereWithAggregatesInput[]
    NOT?: AccountUserScalarWhereWithAggregatesInput | AccountUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccountUser"> | string
    email?: StringWithAggregatesFilter<"AccountUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AccountUser"> | string
    role?: EnumAccountUserRoleWithAggregatesFilter<"AccountUser"> | $Enums.AccountUserRole
    fullName?: StringWithAggregatesFilter<"AccountUser"> | string
    phone?: StringNullableWithAggregatesFilter<"AccountUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AccountUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AccountUser"> | Date | string
  }

  export type ServiceCategoryWhereInput = {
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    id?: StringFilter<"ServiceCategory"> | string
    key?: EnumServiceCategoryKeyFilter<"ServiceCategory"> | $Enums.ServiceCategoryKey
    titleDe?: StringFilter<"ServiceCategory"> | string
    titleEn?: StringFilter<"ServiceCategory"> | string
    titleRu?: StringFilter<"ServiceCategory"> | string
    baselineHourlyRate?: DecimalFilter<"ServiceCategory"> | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFilter<"ServiceCategory"> | string
    craftClassification?: EnumCraftClassificationFilter<"ServiceCategory"> | $Enums.CraftClassification
    leadArtisan?: StringNullableFilter<"ServiceCategory"> | string | null
    isFeatured?: BoolFilter<"ServiceCategory"> | boolean
    descriptionDe?: StringNullableFilter<"ServiceCategory"> | string | null
    descriptionEn?: StringNullableFilter<"ServiceCategory"> | string | null
    descriptionRu?: StringNullableFilter<"ServiceCategory"> | string | null
    imageUrl?: StringNullableFilter<"ServiceCategory"> | string | null
    iconName?: StringNullableFilter<"ServiceCategory"> | string | null
    displayOrder?: IntNullableFilter<"ServiceCategory"> | number | null
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }

  export type ServiceCategoryOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    titleDe?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    baselineHourlyRate?: SortOrder
    typicalRangeEur?: SortOrder
    craftClassification?: SortOrder
    leadArtisan?: SortOrderInput | SortOrder
    isFeatured?: SortOrder
    descriptionDe?: SortOrderInput | SortOrder
    descriptionEn?: SortOrderInput | SortOrder
    descriptionRu?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    iconName?: SortOrderInput | SortOrder
    displayOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quoteRequests?: QuoteRequestOrderByRelationAggregateInput
    _relevance?: ServiceCategoryOrderByRelevanceInput
  }

  export type ServiceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: $Enums.ServiceCategoryKey
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    titleDe?: StringFilter<"ServiceCategory"> | string
    titleEn?: StringFilter<"ServiceCategory"> | string
    titleRu?: StringFilter<"ServiceCategory"> | string
    baselineHourlyRate?: DecimalFilter<"ServiceCategory"> | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFilter<"ServiceCategory"> | string
    craftClassification?: EnumCraftClassificationFilter<"ServiceCategory"> | $Enums.CraftClassification
    leadArtisan?: StringNullableFilter<"ServiceCategory"> | string | null
    isFeatured?: BoolFilter<"ServiceCategory"> | boolean
    descriptionDe?: StringNullableFilter<"ServiceCategory"> | string | null
    descriptionEn?: StringNullableFilter<"ServiceCategory"> | string | null
    descriptionRu?: StringNullableFilter<"ServiceCategory"> | string | null
    imageUrl?: StringNullableFilter<"ServiceCategory"> | string | null
    iconName?: StringNullableFilter<"ServiceCategory"> | string | null
    displayOrder?: IntNullableFilter<"ServiceCategory"> | number | null
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }, "id" | "key">

  export type ServiceCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    titleDe?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    baselineHourlyRate?: SortOrder
    typicalRangeEur?: SortOrder
    craftClassification?: SortOrder
    leadArtisan?: SortOrderInput | SortOrder
    isFeatured?: SortOrder
    descriptionDe?: SortOrderInput | SortOrder
    descriptionEn?: SortOrderInput | SortOrder
    descriptionRu?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    iconName?: SortOrderInput | SortOrder
    displayOrder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCategoryCountOrderByAggregateInput
    _avg?: ServiceCategoryAvgOrderByAggregateInput
    _max?: ServiceCategoryMaxOrderByAggregateInput
    _min?: ServiceCategoryMinOrderByAggregateInput
    _sum?: ServiceCategorySumOrderByAggregateInput
  }

  export type ServiceCategoryScalarWhereWithAggregatesInput = {
    AND?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    OR?: ServiceCategoryScalarWhereWithAggregatesInput[]
    NOT?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceCategory"> | string
    key?: EnumServiceCategoryKeyWithAggregatesFilter<"ServiceCategory"> | $Enums.ServiceCategoryKey
    titleDe?: StringWithAggregatesFilter<"ServiceCategory"> | string
    titleEn?: StringWithAggregatesFilter<"ServiceCategory"> | string
    titleRu?: StringWithAggregatesFilter<"ServiceCategory"> | string
    baselineHourlyRate?: DecimalWithAggregatesFilter<"ServiceCategory"> | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringWithAggregatesFilter<"ServiceCategory"> | string
    craftClassification?: EnumCraftClassificationWithAggregatesFilter<"ServiceCategory"> | $Enums.CraftClassification
    leadArtisan?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    isFeatured?: BoolWithAggregatesFilter<"ServiceCategory"> | boolean
    descriptionDe?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    descriptionEn?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    descriptionRu?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    iconName?: StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null
    displayOrder?: IntNullableWithAggregatesFilter<"ServiceCategory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
  }

  export type ViennaDistrictWhereInput = {
    AND?: ViennaDistrictWhereInput | ViennaDistrictWhereInput[]
    OR?: ViennaDistrictWhereInput[]
    NOT?: ViennaDistrictWhereInput | ViennaDistrictWhereInput[]
    id?: StringFilter<"ViennaDistrict"> | string
    districtCode?: StringFilter<"ViennaDistrict"> | string
    districtName?: StringFilter<"ViennaDistrict"> | string
    districtNumber?: IntFilter<"ViennaDistrict"> | number
    zone?: EnumLogisticsZoneFilter<"ViennaDistrict"> | $Enums.LogisticsZone
    leadTimeHours?: IntFilter<"ViennaDistrict"> | number
    createdAt?: DateTimeFilter<"ViennaDistrict"> | Date | string
    updatedAt?: DateTimeFilter<"ViennaDistrict"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }

  export type ViennaDistrictOrderByWithRelationInput = {
    id?: SortOrder
    districtCode?: SortOrder
    districtName?: SortOrder
    districtNumber?: SortOrder
    zone?: SortOrder
    leadTimeHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quoteRequests?: QuoteRequestOrderByRelationAggregateInput
    _relevance?: ViennaDistrictOrderByRelevanceInput
  }

  export type ViennaDistrictWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    districtCode?: string
    AND?: ViennaDistrictWhereInput | ViennaDistrictWhereInput[]
    OR?: ViennaDistrictWhereInput[]
    NOT?: ViennaDistrictWhereInput | ViennaDistrictWhereInput[]
    districtName?: StringFilter<"ViennaDistrict"> | string
    districtNumber?: IntFilter<"ViennaDistrict"> | number
    zone?: EnumLogisticsZoneFilter<"ViennaDistrict"> | $Enums.LogisticsZone
    leadTimeHours?: IntFilter<"ViennaDistrict"> | number
    createdAt?: DateTimeFilter<"ViennaDistrict"> | Date | string
    updatedAt?: DateTimeFilter<"ViennaDistrict"> | Date | string
    quoteRequests?: QuoteRequestListRelationFilter
  }, "id" | "districtCode">

  export type ViennaDistrictOrderByWithAggregationInput = {
    id?: SortOrder
    districtCode?: SortOrder
    districtName?: SortOrder
    districtNumber?: SortOrder
    zone?: SortOrder
    leadTimeHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ViennaDistrictCountOrderByAggregateInput
    _avg?: ViennaDistrictAvgOrderByAggregateInput
    _max?: ViennaDistrictMaxOrderByAggregateInput
    _min?: ViennaDistrictMinOrderByAggregateInput
    _sum?: ViennaDistrictSumOrderByAggregateInput
  }

  export type ViennaDistrictScalarWhereWithAggregatesInput = {
    AND?: ViennaDistrictScalarWhereWithAggregatesInput | ViennaDistrictScalarWhereWithAggregatesInput[]
    OR?: ViennaDistrictScalarWhereWithAggregatesInput[]
    NOT?: ViennaDistrictScalarWhereWithAggregatesInput | ViennaDistrictScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ViennaDistrict"> | string
    districtCode?: StringWithAggregatesFilter<"ViennaDistrict"> | string
    districtName?: StringWithAggregatesFilter<"ViennaDistrict"> | string
    districtNumber?: IntWithAggregatesFilter<"ViennaDistrict"> | number
    zone?: EnumLogisticsZoneWithAggregatesFilter<"ViennaDistrict"> | $Enums.LogisticsZone
    leadTimeHours?: IntWithAggregatesFilter<"ViennaDistrict"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ViennaDistrict"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ViennaDistrict"> | Date | string
  }

  export type SetupChecklistItemWhereInput = {
    AND?: SetupChecklistItemWhereInput | SetupChecklistItemWhereInput[]
    OR?: SetupChecklistItemWhereInput[]
    NOT?: SetupChecklistItemWhereInput | SetupChecklistItemWhereInput[]
    id?: StringFilter<"SetupChecklistItem"> | string
    itemKey?: EnumChecklistItemKeyFilter<"SetupChecklistItem"> | $Enums.ChecklistItemKey
    title?: StringFilter<"SetupChecklistItem"> | string
    subtitle?: StringFilter<"SetupChecklistItem"> | string
    status?: EnumChecklistStatusFilter<"SetupChecklistItem"> | $Enums.ChecklistStatus
    fieldValue?: StringFilter<"SetupChecklistItem"> | string
    legalRef?: StringFilter<"SetupChecklistItem"> | string
    lastUpdated?: StringFilter<"SetupChecklistItem"> | string
    createdAt?: DateTimeFilter<"SetupChecklistItem"> | Date | string
    updatedAt?: DateTimeFilter<"SetupChecklistItem"> | Date | string
  }

  export type SetupChecklistItemOrderByWithRelationInput = {
    id?: SortOrder
    itemKey?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    status?: SortOrder
    fieldValue?: SortOrder
    legalRef?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: SetupChecklistItemOrderByRelevanceInput
  }

  export type SetupChecklistItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    itemKey?: $Enums.ChecklistItemKey
    AND?: SetupChecklistItemWhereInput | SetupChecklistItemWhereInput[]
    OR?: SetupChecklistItemWhereInput[]
    NOT?: SetupChecklistItemWhereInput | SetupChecklistItemWhereInput[]
    title?: StringFilter<"SetupChecklistItem"> | string
    subtitle?: StringFilter<"SetupChecklistItem"> | string
    status?: EnumChecklistStatusFilter<"SetupChecklistItem"> | $Enums.ChecklistStatus
    fieldValue?: StringFilter<"SetupChecklistItem"> | string
    legalRef?: StringFilter<"SetupChecklistItem"> | string
    lastUpdated?: StringFilter<"SetupChecklistItem"> | string
    createdAt?: DateTimeFilter<"SetupChecklistItem"> | Date | string
    updatedAt?: DateTimeFilter<"SetupChecklistItem"> | Date | string
  }, "id" | "itemKey">

  export type SetupChecklistItemOrderByWithAggregationInput = {
    id?: SortOrder
    itemKey?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    status?: SortOrder
    fieldValue?: SortOrder
    legalRef?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SetupChecklistItemCountOrderByAggregateInput
    _max?: SetupChecklistItemMaxOrderByAggregateInput
    _min?: SetupChecklistItemMinOrderByAggregateInput
  }

  export type SetupChecklistItemScalarWhereWithAggregatesInput = {
    AND?: SetupChecklistItemScalarWhereWithAggregatesInput | SetupChecklistItemScalarWhereWithAggregatesInput[]
    OR?: SetupChecklistItemScalarWhereWithAggregatesInput[]
    NOT?: SetupChecklistItemScalarWhereWithAggregatesInput | SetupChecklistItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    itemKey?: EnumChecklistItemKeyWithAggregatesFilter<"SetupChecklistItem"> | $Enums.ChecklistItemKey
    title?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    subtitle?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    status?: EnumChecklistStatusWithAggregatesFilter<"SetupChecklistItem"> | $Enums.ChecklistStatus
    fieldValue?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    legalRef?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    lastUpdated?: StringWithAggregatesFilter<"SetupChecklistItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SetupChecklistItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SetupChecklistItem"> | Date | string
  }

  export type FaqItemWhereInput = {
    AND?: FaqItemWhereInput | FaqItemWhereInput[]
    OR?: FaqItemWhereInput[]
    NOT?: FaqItemWhereInput | FaqItemWhereInput[]
    id?: StringFilter<"FaqItem"> | string
    category?: EnumFaqCategoryFilter<"FaqItem"> | $Enums.FaqCategory
    questionDe?: StringFilter<"FaqItem"> | string
    questionEn?: StringFilter<"FaqItem"> | string
    questionRu?: StringFilter<"FaqItem"> | string
    answerDe?: StringFilter<"FaqItem"> | string
    answerEn?: StringFilter<"FaqItem"> | string
    answerRu?: StringFilter<"FaqItem"> | string
    displayOrder?: IntFilter<"FaqItem"> | number
    createdAt?: DateTimeFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeFilter<"FaqItem"> | Date | string
  }

  export type FaqItemOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    questionDe?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    answerDe?: SortOrder
    answerEn?: SortOrder
    answerRu?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: FaqItemOrderByRelevanceInput
  }

  export type FaqItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FaqItemWhereInput | FaqItemWhereInput[]
    OR?: FaqItemWhereInput[]
    NOT?: FaqItemWhereInput | FaqItemWhereInput[]
    category?: EnumFaqCategoryFilter<"FaqItem"> | $Enums.FaqCategory
    questionDe?: StringFilter<"FaqItem"> | string
    questionEn?: StringFilter<"FaqItem"> | string
    questionRu?: StringFilter<"FaqItem"> | string
    answerDe?: StringFilter<"FaqItem"> | string
    answerEn?: StringFilter<"FaqItem"> | string
    answerRu?: StringFilter<"FaqItem"> | string
    displayOrder?: IntFilter<"FaqItem"> | number
    createdAt?: DateTimeFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeFilter<"FaqItem"> | Date | string
  }, "id">

  export type FaqItemOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    questionDe?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    answerDe?: SortOrder
    answerEn?: SortOrder
    answerRu?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FaqItemCountOrderByAggregateInput
    _avg?: FaqItemAvgOrderByAggregateInput
    _max?: FaqItemMaxOrderByAggregateInput
    _min?: FaqItemMinOrderByAggregateInput
    _sum?: FaqItemSumOrderByAggregateInput
  }

  export type FaqItemScalarWhereWithAggregatesInput = {
    AND?: FaqItemScalarWhereWithAggregatesInput | FaqItemScalarWhereWithAggregatesInput[]
    OR?: FaqItemScalarWhereWithAggregatesInput[]
    NOT?: FaqItemScalarWhereWithAggregatesInput | FaqItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FaqItem"> | string
    category?: EnumFaqCategoryWithAggregatesFilter<"FaqItem"> | $Enums.FaqCategory
    questionDe?: StringWithAggregatesFilter<"FaqItem"> | string
    questionEn?: StringWithAggregatesFilter<"FaqItem"> | string
    questionRu?: StringWithAggregatesFilter<"FaqItem"> | string
    answerDe?: StringWithAggregatesFilter<"FaqItem"> | string
    answerEn?: StringWithAggregatesFilter<"FaqItem"> | string
    answerRu?: StringWithAggregatesFilter<"FaqItem"> | string
    displayOrder?: IntWithAggregatesFilter<"FaqItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FaqItem"> | Date | string
  }

  export type QuoteRequestWhereInput = {
    AND?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    OR?: QuoteRequestWhereInput[]
    NOT?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    id?: StringFilter<"QuoteRequest"> | string
    trackingCode?: StringFilter<"QuoteRequest"> | string
    customerId?: StringNullableFilter<"QuoteRequest"> | string | null
    clientName?: StringFilter<"QuoteRequest"> | string
    clientPhone?: StringFilter<"QuoteRequest"> | string
    clientEmail?: StringFilter<"QuoteRequest"> | string
    serviceCategoryId?: StringFilter<"QuoteRequest"> | string
    districtId?: StringFilter<"QuoteRequest"> | string
    addressSnippet?: StringFilter<"QuoteRequest"> | string
    taskTitle?: StringFilter<"QuoteRequest"> | string
    taskDescription?: StringFilter<"QuoteRequest"> | string
    estimatedHours?: IntFilter<"QuoteRequest"> | number
    estimatedBudgetEur?: DecimalFilter<"QuoteRequest"> | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFilter<"QuoteRequest"> | string
    preferredTimeSlot?: EnumPreferredTimeSlotFilter<"QuoteRequest"> | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFilter<"QuoteRequest"> | boolean
    agreedToTerms?: BoolFilter<"QuoteRequest"> | boolean
    submissionLang?: EnumSubmissionLanguageFilter<"QuoteRequest"> | $Enums.SubmissionLanguage
    isUrgent?: BoolFilter<"QuoteRequest"> | boolean
    status?: EnumQuoteStatusFilter<"QuoteRequest"> | $Enums.QuoteStatus
    createdAtFormatted?: StringNullableFilter<"QuoteRequest"> | string | null
    scopeNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    updatedAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    customer?: XOR<AccountUserNullableScalarRelationFilter, AccountUserWhereInput> | null
    serviceCategory?: XOR<ServiceCategoryScalarRelationFilter, ServiceCategoryWhereInput>
    district?: XOR<ViennaDistrictScalarRelationFilter, ViennaDistrictWhereInput>
  }

  export type QuoteRequestOrderByWithRelationInput = {
    id?: SortOrder
    trackingCode?: SortOrder
    customerId?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientPhone?: SortOrder
    clientEmail?: SortOrder
    serviceCategoryId?: SortOrder
    districtId?: SortOrder
    addressSnippet?: SortOrder
    taskTitle?: SortOrder
    taskDescription?: SortOrder
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
    preferredDate?: SortOrder
    preferredTimeSlot?: SortOrder
    hasMaterials?: SortOrder
    agreedToTerms?: SortOrder
    submissionLang?: SortOrder
    isUrgent?: SortOrder
    status?: SortOrder
    createdAtFormatted?: SortOrderInput | SortOrder
    scopeNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: AccountUserOrderByWithRelationInput
    serviceCategory?: ServiceCategoryOrderByWithRelationInput
    district?: ViennaDistrictOrderByWithRelationInput
    _relevance?: QuoteRequestOrderByRelevanceInput
  }

  export type QuoteRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trackingCode?: string
    AND?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    OR?: QuoteRequestWhereInput[]
    NOT?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    customerId?: StringNullableFilter<"QuoteRequest"> | string | null
    clientName?: StringFilter<"QuoteRequest"> | string
    clientPhone?: StringFilter<"QuoteRequest"> | string
    clientEmail?: StringFilter<"QuoteRequest"> | string
    serviceCategoryId?: StringFilter<"QuoteRequest"> | string
    districtId?: StringFilter<"QuoteRequest"> | string
    addressSnippet?: StringFilter<"QuoteRequest"> | string
    taskTitle?: StringFilter<"QuoteRequest"> | string
    taskDescription?: StringFilter<"QuoteRequest"> | string
    estimatedHours?: IntFilter<"QuoteRequest"> | number
    estimatedBudgetEur?: DecimalFilter<"QuoteRequest"> | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFilter<"QuoteRequest"> | string
    preferredTimeSlot?: EnumPreferredTimeSlotFilter<"QuoteRequest"> | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFilter<"QuoteRequest"> | boolean
    agreedToTerms?: BoolFilter<"QuoteRequest"> | boolean
    submissionLang?: EnumSubmissionLanguageFilter<"QuoteRequest"> | $Enums.SubmissionLanguage
    isUrgent?: BoolFilter<"QuoteRequest"> | boolean
    status?: EnumQuoteStatusFilter<"QuoteRequest"> | $Enums.QuoteStatus
    createdAtFormatted?: StringNullableFilter<"QuoteRequest"> | string | null
    scopeNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    updatedAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    customer?: XOR<AccountUserNullableScalarRelationFilter, AccountUserWhereInput> | null
    serviceCategory?: XOR<ServiceCategoryScalarRelationFilter, ServiceCategoryWhereInput>
    district?: XOR<ViennaDistrictScalarRelationFilter, ViennaDistrictWhereInput>
  }, "id" | "trackingCode">

  export type QuoteRequestOrderByWithAggregationInput = {
    id?: SortOrder
    trackingCode?: SortOrder
    customerId?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientPhone?: SortOrder
    clientEmail?: SortOrder
    serviceCategoryId?: SortOrder
    districtId?: SortOrder
    addressSnippet?: SortOrder
    taskTitle?: SortOrder
    taskDescription?: SortOrder
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
    preferredDate?: SortOrder
    preferredTimeSlot?: SortOrder
    hasMaterials?: SortOrder
    agreedToTerms?: SortOrder
    submissionLang?: SortOrder
    isUrgent?: SortOrder
    status?: SortOrder
    createdAtFormatted?: SortOrderInput | SortOrder
    scopeNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuoteRequestCountOrderByAggregateInput
    _avg?: QuoteRequestAvgOrderByAggregateInput
    _max?: QuoteRequestMaxOrderByAggregateInput
    _min?: QuoteRequestMinOrderByAggregateInput
    _sum?: QuoteRequestSumOrderByAggregateInput
  }

  export type QuoteRequestScalarWhereWithAggregatesInput = {
    AND?: QuoteRequestScalarWhereWithAggregatesInput | QuoteRequestScalarWhereWithAggregatesInput[]
    OR?: QuoteRequestScalarWhereWithAggregatesInput[]
    NOT?: QuoteRequestScalarWhereWithAggregatesInput | QuoteRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuoteRequest"> | string
    trackingCode?: StringWithAggregatesFilter<"QuoteRequest"> | string
    customerId?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    clientName?: StringWithAggregatesFilter<"QuoteRequest"> | string
    clientPhone?: StringWithAggregatesFilter<"QuoteRequest"> | string
    clientEmail?: StringWithAggregatesFilter<"QuoteRequest"> | string
    serviceCategoryId?: StringWithAggregatesFilter<"QuoteRequest"> | string
    districtId?: StringWithAggregatesFilter<"QuoteRequest"> | string
    addressSnippet?: StringWithAggregatesFilter<"QuoteRequest"> | string
    taskTitle?: StringWithAggregatesFilter<"QuoteRequest"> | string
    taskDescription?: StringWithAggregatesFilter<"QuoteRequest"> | string
    estimatedHours?: IntWithAggregatesFilter<"QuoteRequest"> | number
    estimatedBudgetEur?: DecimalWithAggregatesFilter<"QuoteRequest"> | Decimal | DecimalJsLike | number | string
    preferredDate?: StringWithAggregatesFilter<"QuoteRequest"> | string
    preferredTimeSlot?: EnumPreferredTimeSlotWithAggregatesFilter<"QuoteRequest"> | $Enums.PreferredTimeSlot
    hasMaterials?: BoolWithAggregatesFilter<"QuoteRequest"> | boolean
    agreedToTerms?: BoolWithAggregatesFilter<"QuoteRequest"> | boolean
    submissionLang?: EnumSubmissionLanguageWithAggregatesFilter<"QuoteRequest"> | $Enums.SubmissionLanguage
    isUrgent?: BoolWithAggregatesFilter<"QuoteRequest"> | boolean
    status?: EnumQuoteStatusWithAggregatesFilter<"QuoteRequest"> | $Enums.QuoteStatus
    createdAtFormatted?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    scopeNotes?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QuoteRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QuoteRequest"> | Date | string
  }

  export type AccountUserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AccountUserRole
    fullName: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCustomerInput
  }

  export type AccountUserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AccountUserRole
    fullName: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type AccountUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUpdateManyWithoutCustomerNestedInput
  }

  export type AccountUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type AccountUserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AccountUserRole
    fullName: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryCreateInput = {
    id?: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal | DecimalJsLike | number | string
    typicalRangeEur: string
    craftClassification?: $Enums.CraftClassification
    leadArtisan?: string | null
    isFeatured?: boolean
    descriptionDe?: string | null
    descriptionEn?: string | null
    descriptionRu?: string | null
    imageUrl?: string | null
    iconName?: string | null
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestCreateNestedManyWithoutServiceCategoryInput
  }

  export type ServiceCategoryUncheckedCreateInput = {
    id?: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal | DecimalJsLike | number | string
    typicalRangeEur: string
    craftClassification?: $Enums.CraftClassification
    leadArtisan?: string | null
    isFeatured?: boolean
    descriptionDe?: string | null
    descriptionEn?: string | null
    descriptionRu?: string | null
    imageUrl?: string | null
    iconName?: string | null
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutServiceCategoryInput
  }

  export type ServiceCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUpdateManyWithoutServiceCategoryNestedInput
  }

  export type ServiceCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutServiceCategoryNestedInput
  }

  export type ServiceCategoryCreateManyInput = {
    id?: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal | DecimalJsLike | number | string
    typicalRangeEur: string
    craftClassification?: $Enums.CraftClassification
    leadArtisan?: string | null
    isFeatured?: boolean
    descriptionDe?: string | null
    descriptionEn?: string | null
    descriptionRu?: string | null
    imageUrl?: string | null
    iconName?: string | null
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViennaDistrictCreateInput = {
    id?: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestCreateNestedManyWithoutDistrictInput
  }

  export type ViennaDistrictUncheckedCreateInput = {
    id?: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutDistrictInput
  }

  export type ViennaDistrictUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUpdateManyWithoutDistrictNestedInput
  }

  export type ViennaDistrictUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutDistrictNestedInput
  }

  export type ViennaDistrictCreateManyInput = {
    id?: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViennaDistrictUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViennaDistrictUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetupChecklistItemCreateInput = {
    id?: string
    itemKey: $Enums.ChecklistItemKey
    title: string
    subtitle: string
    status?: $Enums.ChecklistStatus
    fieldValue: string
    legalRef: string
    lastUpdated: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SetupChecklistItemUncheckedCreateInput = {
    id?: string
    itemKey: $Enums.ChecklistItemKey
    title: string
    subtitle: string
    status?: $Enums.ChecklistStatus
    fieldValue: string
    legalRef: string
    lastUpdated: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SetupChecklistItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemKey?: EnumChecklistItemKeyFieldUpdateOperationsInput | $Enums.ChecklistItemKey
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    status?: EnumChecklistStatusFieldUpdateOperationsInput | $Enums.ChecklistStatus
    fieldValue?: StringFieldUpdateOperationsInput | string
    legalRef?: StringFieldUpdateOperationsInput | string
    lastUpdated?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetupChecklistItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemKey?: EnumChecklistItemKeyFieldUpdateOperationsInput | $Enums.ChecklistItemKey
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    status?: EnumChecklistStatusFieldUpdateOperationsInput | $Enums.ChecklistStatus
    fieldValue?: StringFieldUpdateOperationsInput | string
    legalRef?: StringFieldUpdateOperationsInput | string
    lastUpdated?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetupChecklistItemCreateManyInput = {
    id?: string
    itemKey: $Enums.ChecklistItemKey
    title: string
    subtitle: string
    status?: $Enums.ChecklistStatus
    fieldValue: string
    legalRef: string
    lastUpdated: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SetupChecklistItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemKey?: EnumChecklistItemKeyFieldUpdateOperationsInput | $Enums.ChecklistItemKey
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    status?: EnumChecklistStatusFieldUpdateOperationsInput | $Enums.ChecklistStatus
    fieldValue?: StringFieldUpdateOperationsInput | string
    legalRef?: StringFieldUpdateOperationsInput | string
    lastUpdated?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetupChecklistItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemKey?: EnumChecklistItemKeyFieldUpdateOperationsInput | $Enums.ChecklistItemKey
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    status?: EnumChecklistStatusFieldUpdateOperationsInput | $Enums.ChecklistStatus
    fieldValue?: StringFieldUpdateOperationsInput | string
    legalRef?: StringFieldUpdateOperationsInput | string
    lastUpdated?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemCreateInput = {
    id?: string
    category: $Enums.FaqCategory
    questionDe: string
    questionEn: string
    questionRu: string
    answerDe: string
    answerEn: string
    answerRu: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUncheckedCreateInput = {
    id?: string
    category: $Enums.FaqCategory
    questionDe: string
    questionEn: string
    questionRu: string
    answerDe: string
    answerEn: string
    answerRu: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumFaqCategoryFieldUpdateOperationsInput | $Enums.FaqCategory
    questionDe?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    answerDe?: StringFieldUpdateOperationsInput | string
    answerEn?: StringFieldUpdateOperationsInput | string
    answerRu?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumFaqCategoryFieldUpdateOperationsInput | $Enums.FaqCategory
    questionDe?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    answerDe?: StringFieldUpdateOperationsInput | string
    answerEn?: StringFieldUpdateOperationsInput | string
    answerRu?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemCreateManyInput = {
    id?: string
    category: $Enums.FaqCategory
    questionDe: string
    questionEn: string
    questionRu: string
    answerDe: string
    answerEn: string
    answerRu: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumFaqCategoryFieldUpdateOperationsInput | $Enums.FaqCategory
    questionDe?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    answerDe?: StringFieldUpdateOperationsInput | string
    answerEn?: StringFieldUpdateOperationsInput | string
    answerRu?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumFaqCategoryFieldUpdateOperationsInput | $Enums.FaqCategory
    questionDe?: StringFieldUpdateOperationsInput | string
    questionEn?: StringFieldUpdateOperationsInput | string
    questionRu?: StringFieldUpdateOperationsInput | string
    answerDe?: StringFieldUpdateOperationsInput | string
    answerEn?: StringFieldUpdateOperationsInput | string
    answerRu?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestCreateInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: AccountUserCreateNestedOneWithoutQuoteRequestsInput
    serviceCategory: ServiceCategoryCreateNestedOneWithoutQuoteRequestsInput
    district: ViennaDistrictCreateNestedOneWithoutQuoteRequestsInput
  }

  export type QuoteRequestUncheckedCreateInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: AccountUserUpdateOneWithoutQuoteRequestsNestedInput
    serviceCategory?: ServiceCategoryUpdateOneRequiredWithoutQuoteRequestsNestedInput
    district?: ViennaDistrictUpdateOneRequiredWithoutQuoteRequestsNestedInput
  }

  export type QuoteRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestCreateManyInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAccountUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountUserRole | EnumAccountUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AccountUserRole[]
    notIn?: $Enums.AccountUserRole[]
    not?: NestedEnumAccountUserRoleFilter<$PrismaModel> | $Enums.AccountUserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type QuoteRequestListRelationFilter = {
    every?: QuoteRequestWhereInput
    some?: QuoteRequestWhereInput
    none?: QuoteRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuoteRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountUserOrderByRelevanceInput = {
    fields: AccountUserOrderByRelevanceFieldEnum | AccountUserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAccountUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountUserRole | EnumAccountUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AccountUserRole[]
    notIn?: $Enums.AccountUserRole[]
    not?: NestedEnumAccountUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.AccountUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountUserRoleFilter<$PrismaModel>
    _max?: NestedEnumAccountUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumServiceCategoryKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategoryKey | EnumServiceCategoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategoryKey[]
    notIn?: $Enums.ServiceCategoryKey[]
    not?: NestedEnumServiceCategoryKeyFilter<$PrismaModel> | $Enums.ServiceCategoryKey
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumCraftClassificationFilter<$PrismaModel = never> = {
    equals?: $Enums.CraftClassification | EnumCraftClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.CraftClassification[]
    notIn?: $Enums.CraftClassification[]
    not?: NestedEnumCraftClassificationFilter<$PrismaModel> | $Enums.CraftClassification
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceCategoryOrderByRelevanceInput = {
    fields: ServiceCategoryOrderByRelevanceFieldEnum | ServiceCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ServiceCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    titleDe?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    baselineHourlyRate?: SortOrder
    typicalRangeEur?: SortOrder
    craftClassification?: SortOrder
    leadArtisan?: SortOrder
    isFeatured?: SortOrder
    descriptionDe?: SortOrder
    descriptionEn?: SortOrder
    descriptionRu?: SortOrder
    imageUrl?: SortOrder
    iconName?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryAvgOrderByAggregateInput = {
    baselineHourlyRate?: SortOrder
    displayOrder?: SortOrder
  }

  export type ServiceCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    titleDe?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    baselineHourlyRate?: SortOrder
    typicalRangeEur?: SortOrder
    craftClassification?: SortOrder
    leadArtisan?: SortOrder
    isFeatured?: SortOrder
    descriptionDe?: SortOrder
    descriptionEn?: SortOrder
    descriptionRu?: SortOrder
    imageUrl?: SortOrder
    iconName?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    titleDe?: SortOrder
    titleEn?: SortOrder
    titleRu?: SortOrder
    baselineHourlyRate?: SortOrder
    typicalRangeEur?: SortOrder
    craftClassification?: SortOrder
    leadArtisan?: SortOrder
    isFeatured?: SortOrder
    descriptionDe?: SortOrder
    descriptionEn?: SortOrder
    descriptionRu?: SortOrder
    imageUrl?: SortOrder
    iconName?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategorySumOrderByAggregateInput = {
    baselineHourlyRate?: SortOrder
    displayOrder?: SortOrder
  }

  export type EnumServiceCategoryKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategoryKey | EnumServiceCategoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategoryKey[]
    notIn?: $Enums.ServiceCategoryKey[]
    not?: NestedEnumServiceCategoryKeyWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategoryKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryKeyFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryKeyFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumCraftClassificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CraftClassification | EnumCraftClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.CraftClassification[]
    notIn?: $Enums.CraftClassification[]
    not?: NestedEnumCraftClassificationWithAggregatesFilter<$PrismaModel> | $Enums.CraftClassification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCraftClassificationFilter<$PrismaModel>
    _max?: NestedEnumCraftClassificationFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumLogisticsZoneFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsZone | EnumLogisticsZoneFieldRefInput<$PrismaModel>
    in?: $Enums.LogisticsZone[]
    notIn?: $Enums.LogisticsZone[]
    not?: NestedEnumLogisticsZoneFilter<$PrismaModel> | $Enums.LogisticsZone
  }

  export type ViennaDistrictOrderByRelevanceInput = {
    fields: ViennaDistrictOrderByRelevanceFieldEnum | ViennaDistrictOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ViennaDistrictCountOrderByAggregateInput = {
    id?: SortOrder
    districtCode?: SortOrder
    districtName?: SortOrder
    districtNumber?: SortOrder
    zone?: SortOrder
    leadTimeHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViennaDistrictAvgOrderByAggregateInput = {
    districtNumber?: SortOrder
    leadTimeHours?: SortOrder
  }

  export type ViennaDistrictMaxOrderByAggregateInput = {
    id?: SortOrder
    districtCode?: SortOrder
    districtName?: SortOrder
    districtNumber?: SortOrder
    zone?: SortOrder
    leadTimeHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViennaDistrictMinOrderByAggregateInput = {
    id?: SortOrder
    districtCode?: SortOrder
    districtName?: SortOrder
    districtNumber?: SortOrder
    zone?: SortOrder
    leadTimeHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViennaDistrictSumOrderByAggregateInput = {
    districtNumber?: SortOrder
    leadTimeHours?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumLogisticsZoneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsZone | EnumLogisticsZoneFieldRefInput<$PrismaModel>
    in?: $Enums.LogisticsZone[]
    notIn?: $Enums.LogisticsZone[]
    not?: NestedEnumLogisticsZoneWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsZone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogisticsZoneFilter<$PrismaModel>
    _max?: NestedEnumLogisticsZoneFilter<$PrismaModel>
  }

  export type EnumChecklistItemKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistItemKey | EnumChecklistItemKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistItemKey[]
    notIn?: $Enums.ChecklistItemKey[]
    not?: NestedEnumChecklistItemKeyFilter<$PrismaModel> | $Enums.ChecklistItemKey
  }

  export type EnumChecklistStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistStatus | EnumChecklistStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistStatus[]
    notIn?: $Enums.ChecklistStatus[]
    not?: NestedEnumChecklistStatusFilter<$PrismaModel> | $Enums.ChecklistStatus
  }

  export type SetupChecklistItemOrderByRelevanceInput = {
    fields: SetupChecklistItemOrderByRelevanceFieldEnum | SetupChecklistItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SetupChecklistItemCountOrderByAggregateInput = {
    id?: SortOrder
    itemKey?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    status?: SortOrder
    fieldValue?: SortOrder
    legalRef?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SetupChecklistItemMaxOrderByAggregateInput = {
    id?: SortOrder
    itemKey?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    status?: SortOrder
    fieldValue?: SortOrder
    legalRef?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SetupChecklistItemMinOrderByAggregateInput = {
    id?: SortOrder
    itemKey?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    status?: SortOrder
    fieldValue?: SortOrder
    legalRef?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumChecklistItemKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistItemKey | EnumChecklistItemKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistItemKey[]
    notIn?: $Enums.ChecklistItemKey[]
    not?: NestedEnumChecklistItemKeyWithAggregatesFilter<$PrismaModel> | $Enums.ChecklistItemKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChecklistItemKeyFilter<$PrismaModel>
    _max?: NestedEnumChecklistItemKeyFilter<$PrismaModel>
  }

  export type EnumChecklistStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistStatus | EnumChecklistStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistStatus[]
    notIn?: $Enums.ChecklistStatus[]
    not?: NestedEnumChecklistStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChecklistStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChecklistStatusFilter<$PrismaModel>
    _max?: NestedEnumChecklistStatusFilter<$PrismaModel>
  }

  export type EnumFaqCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.FaqCategory | EnumFaqCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FaqCategory[]
    notIn?: $Enums.FaqCategory[]
    not?: NestedEnumFaqCategoryFilter<$PrismaModel> | $Enums.FaqCategory
  }

  export type FaqItemOrderByRelevanceInput = {
    fields: FaqItemOrderByRelevanceFieldEnum | FaqItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FaqItemCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    questionDe?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    answerDe?: SortOrder
    answerEn?: SortOrder
    answerRu?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type FaqItemMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    questionDe?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    answerDe?: SortOrder
    answerEn?: SortOrder
    answerRu?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    questionDe?: SortOrder
    questionEn?: SortOrder
    questionRu?: SortOrder
    answerDe?: SortOrder
    answerEn?: SortOrder
    answerRu?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EnumFaqCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaqCategory | EnumFaqCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FaqCategory[]
    notIn?: $Enums.FaqCategory[]
    not?: NestedEnumFaqCategoryWithAggregatesFilter<$PrismaModel> | $Enums.FaqCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaqCategoryFilter<$PrismaModel>
    _max?: NestedEnumFaqCategoryFilter<$PrismaModel>
  }

  export type EnumPreferredTimeSlotFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredTimeSlot | EnumPreferredTimeSlotFieldRefInput<$PrismaModel>
    in?: $Enums.PreferredTimeSlot[]
    notIn?: $Enums.PreferredTimeSlot[]
    not?: NestedEnumPreferredTimeSlotFilter<$PrismaModel> | $Enums.PreferredTimeSlot
  }

  export type EnumSubmissionLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionLanguage | EnumSubmissionLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionLanguage[]
    notIn?: $Enums.SubmissionLanguage[]
    not?: NestedEnumSubmissionLanguageFilter<$PrismaModel> | $Enums.SubmissionLanguage
  }

  export type EnumQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | EnumQuoteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuoteStatus[]
    notIn?: $Enums.QuoteStatus[]
    not?: NestedEnumQuoteStatusFilter<$PrismaModel> | $Enums.QuoteStatus
  }

  export type AccountUserNullableScalarRelationFilter = {
    is?: AccountUserWhereInput | null
    isNot?: AccountUserWhereInput | null
  }

  export type ServiceCategoryScalarRelationFilter = {
    is?: ServiceCategoryWhereInput
    isNot?: ServiceCategoryWhereInput
  }

  export type ViennaDistrictScalarRelationFilter = {
    is?: ViennaDistrictWhereInput
    isNot?: ViennaDistrictWhereInput
  }

  export type QuoteRequestOrderByRelevanceInput = {
    fields: QuoteRequestOrderByRelevanceFieldEnum | QuoteRequestOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type QuoteRequestCountOrderByAggregateInput = {
    id?: SortOrder
    trackingCode?: SortOrder
    customerId?: SortOrder
    clientName?: SortOrder
    clientPhone?: SortOrder
    clientEmail?: SortOrder
    serviceCategoryId?: SortOrder
    districtId?: SortOrder
    addressSnippet?: SortOrder
    taskTitle?: SortOrder
    taskDescription?: SortOrder
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
    preferredDate?: SortOrder
    preferredTimeSlot?: SortOrder
    hasMaterials?: SortOrder
    agreedToTerms?: SortOrder
    submissionLang?: SortOrder
    isUrgent?: SortOrder
    status?: SortOrder
    createdAtFormatted?: SortOrder
    scopeNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteRequestAvgOrderByAggregateInput = {
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
  }

  export type QuoteRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    trackingCode?: SortOrder
    customerId?: SortOrder
    clientName?: SortOrder
    clientPhone?: SortOrder
    clientEmail?: SortOrder
    serviceCategoryId?: SortOrder
    districtId?: SortOrder
    addressSnippet?: SortOrder
    taskTitle?: SortOrder
    taskDescription?: SortOrder
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
    preferredDate?: SortOrder
    preferredTimeSlot?: SortOrder
    hasMaterials?: SortOrder
    agreedToTerms?: SortOrder
    submissionLang?: SortOrder
    isUrgent?: SortOrder
    status?: SortOrder
    createdAtFormatted?: SortOrder
    scopeNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteRequestMinOrderByAggregateInput = {
    id?: SortOrder
    trackingCode?: SortOrder
    customerId?: SortOrder
    clientName?: SortOrder
    clientPhone?: SortOrder
    clientEmail?: SortOrder
    serviceCategoryId?: SortOrder
    districtId?: SortOrder
    addressSnippet?: SortOrder
    taskTitle?: SortOrder
    taskDescription?: SortOrder
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
    preferredDate?: SortOrder
    preferredTimeSlot?: SortOrder
    hasMaterials?: SortOrder
    agreedToTerms?: SortOrder
    submissionLang?: SortOrder
    isUrgent?: SortOrder
    status?: SortOrder
    createdAtFormatted?: SortOrder
    scopeNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteRequestSumOrderByAggregateInput = {
    estimatedHours?: SortOrder
    estimatedBudgetEur?: SortOrder
  }

  export type EnumPreferredTimeSlotWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredTimeSlot | EnumPreferredTimeSlotFieldRefInput<$PrismaModel>
    in?: $Enums.PreferredTimeSlot[]
    notIn?: $Enums.PreferredTimeSlot[]
    not?: NestedEnumPreferredTimeSlotWithAggregatesFilter<$PrismaModel> | $Enums.PreferredTimeSlot
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferredTimeSlotFilter<$PrismaModel>
    _max?: NestedEnumPreferredTimeSlotFilter<$PrismaModel>
  }

  export type EnumSubmissionLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionLanguage | EnumSubmissionLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionLanguage[]
    notIn?: $Enums.SubmissionLanguage[]
    not?: NestedEnumSubmissionLanguageWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionLanguage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionLanguageFilter<$PrismaModel>
    _max?: NestedEnumSubmissionLanguageFilter<$PrismaModel>
  }

  export type EnumQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | EnumQuoteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuoteStatus[]
    notIn?: $Enums.QuoteStatus[]
    not?: NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuoteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuoteStatusFilter<$PrismaModel>
    _max?: NestedEnumQuoteStatusFilter<$PrismaModel>
  }

  export type QuoteRequestCreateNestedManyWithoutCustomerInput = {
    create?: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput> | QuoteRequestCreateWithoutCustomerInput[] | QuoteRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCustomerInput | QuoteRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: QuoteRequestCreateManyCustomerInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type QuoteRequestUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput> | QuoteRequestCreateWithoutCustomerInput[] | QuoteRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCustomerInput | QuoteRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: QuoteRequestCreateManyCustomerInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAccountUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.AccountUserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type QuoteRequestUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput> | QuoteRequestCreateWithoutCustomerInput[] | QuoteRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCustomerInput | QuoteRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutCustomerInput | QuoteRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: QuoteRequestCreateManyCustomerInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutCustomerInput | QuoteRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutCustomerInput | QuoteRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type QuoteRequestUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput> | QuoteRequestCreateWithoutCustomerInput[] | QuoteRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCustomerInput | QuoteRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutCustomerInput | QuoteRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: QuoteRequestCreateManyCustomerInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutCustomerInput | QuoteRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutCustomerInput | QuoteRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type QuoteRequestCreateNestedManyWithoutServiceCategoryInput = {
    create?: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput> | QuoteRequestCreateWithoutServiceCategoryInput[] | QuoteRequestUncheckedCreateWithoutServiceCategoryInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutServiceCategoryInput | QuoteRequestCreateOrConnectWithoutServiceCategoryInput[]
    createMany?: QuoteRequestCreateManyServiceCategoryInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type QuoteRequestUncheckedCreateNestedManyWithoutServiceCategoryInput = {
    create?: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput> | QuoteRequestCreateWithoutServiceCategoryInput[] | QuoteRequestUncheckedCreateWithoutServiceCategoryInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutServiceCategoryInput | QuoteRequestCreateOrConnectWithoutServiceCategoryInput[]
    createMany?: QuoteRequestCreateManyServiceCategoryInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type EnumServiceCategoryKeyFieldUpdateOperationsInput = {
    set?: $Enums.ServiceCategoryKey
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumCraftClassificationFieldUpdateOperationsInput = {
    set?: $Enums.CraftClassification
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuoteRequestUpdateManyWithoutServiceCategoryNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput> | QuoteRequestCreateWithoutServiceCategoryInput[] | QuoteRequestUncheckedCreateWithoutServiceCategoryInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutServiceCategoryInput | QuoteRequestCreateOrConnectWithoutServiceCategoryInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutServiceCategoryInput | QuoteRequestUpsertWithWhereUniqueWithoutServiceCategoryInput[]
    createMany?: QuoteRequestCreateManyServiceCategoryInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutServiceCategoryInput | QuoteRequestUpdateWithWhereUniqueWithoutServiceCategoryInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutServiceCategoryInput | QuoteRequestUpdateManyWithWhereWithoutServiceCategoryInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type QuoteRequestUncheckedUpdateManyWithoutServiceCategoryNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput> | QuoteRequestCreateWithoutServiceCategoryInput[] | QuoteRequestUncheckedCreateWithoutServiceCategoryInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutServiceCategoryInput | QuoteRequestCreateOrConnectWithoutServiceCategoryInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutServiceCategoryInput | QuoteRequestUpsertWithWhereUniqueWithoutServiceCategoryInput[]
    createMany?: QuoteRequestCreateManyServiceCategoryInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutServiceCategoryInput | QuoteRequestUpdateWithWhereUniqueWithoutServiceCategoryInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutServiceCategoryInput | QuoteRequestUpdateManyWithWhereWithoutServiceCategoryInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type QuoteRequestCreateNestedManyWithoutDistrictInput = {
    create?: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput> | QuoteRequestCreateWithoutDistrictInput[] | QuoteRequestUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutDistrictInput | QuoteRequestCreateOrConnectWithoutDistrictInput[]
    createMany?: QuoteRequestCreateManyDistrictInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type QuoteRequestUncheckedCreateNestedManyWithoutDistrictInput = {
    create?: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput> | QuoteRequestCreateWithoutDistrictInput[] | QuoteRequestUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutDistrictInput | QuoteRequestCreateOrConnectWithoutDistrictInput[]
    createMany?: QuoteRequestCreateManyDistrictInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumLogisticsZoneFieldUpdateOperationsInput = {
    set?: $Enums.LogisticsZone
  }

  export type QuoteRequestUpdateManyWithoutDistrictNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput> | QuoteRequestCreateWithoutDistrictInput[] | QuoteRequestUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutDistrictInput | QuoteRequestCreateOrConnectWithoutDistrictInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutDistrictInput | QuoteRequestUpsertWithWhereUniqueWithoutDistrictInput[]
    createMany?: QuoteRequestCreateManyDistrictInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutDistrictInput | QuoteRequestUpdateWithWhereUniqueWithoutDistrictInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutDistrictInput | QuoteRequestUpdateManyWithWhereWithoutDistrictInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type QuoteRequestUncheckedUpdateManyWithoutDistrictNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput> | QuoteRequestCreateWithoutDistrictInput[] | QuoteRequestUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutDistrictInput | QuoteRequestCreateOrConnectWithoutDistrictInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutDistrictInput | QuoteRequestUpsertWithWhereUniqueWithoutDistrictInput[]
    createMany?: QuoteRequestCreateManyDistrictInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutDistrictInput | QuoteRequestUpdateWithWhereUniqueWithoutDistrictInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutDistrictInput | QuoteRequestUpdateManyWithWhereWithoutDistrictInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type EnumChecklistItemKeyFieldUpdateOperationsInput = {
    set?: $Enums.ChecklistItemKey
  }

  export type EnumChecklistStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChecklistStatus
  }

  export type EnumFaqCategoryFieldUpdateOperationsInput = {
    set?: $Enums.FaqCategory
  }

  export type AccountUserCreateNestedOneWithoutQuoteRequestsInput = {
    create?: XOR<AccountUserCreateWithoutQuoteRequestsInput, AccountUserUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: AccountUserCreateOrConnectWithoutQuoteRequestsInput
    connect?: AccountUserWhereUniqueInput
  }

  export type ServiceCategoryCreateNestedOneWithoutQuoteRequestsInput = {
    create?: XOR<ServiceCategoryCreateWithoutQuoteRequestsInput, ServiceCategoryUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutQuoteRequestsInput
    connect?: ServiceCategoryWhereUniqueInput
  }

  export type ViennaDistrictCreateNestedOneWithoutQuoteRequestsInput = {
    create?: XOR<ViennaDistrictCreateWithoutQuoteRequestsInput, ViennaDistrictUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: ViennaDistrictCreateOrConnectWithoutQuoteRequestsInput
    connect?: ViennaDistrictWhereUniqueInput
  }

  export type EnumPreferredTimeSlotFieldUpdateOperationsInput = {
    set?: $Enums.PreferredTimeSlot
  }

  export type EnumSubmissionLanguageFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionLanguage
  }

  export type EnumQuoteStatusFieldUpdateOperationsInput = {
    set?: $Enums.QuoteStatus
  }

  export type AccountUserUpdateOneWithoutQuoteRequestsNestedInput = {
    create?: XOR<AccountUserCreateWithoutQuoteRequestsInput, AccountUserUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: AccountUserCreateOrConnectWithoutQuoteRequestsInput
    upsert?: AccountUserUpsertWithoutQuoteRequestsInput
    disconnect?: AccountUserWhereInput | boolean
    delete?: AccountUserWhereInput | boolean
    connect?: AccountUserWhereUniqueInput
    update?: XOR<XOR<AccountUserUpdateToOneWithWhereWithoutQuoteRequestsInput, AccountUserUpdateWithoutQuoteRequestsInput>, AccountUserUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type ServiceCategoryUpdateOneRequiredWithoutQuoteRequestsNestedInput = {
    create?: XOR<ServiceCategoryCreateWithoutQuoteRequestsInput, ServiceCategoryUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutQuoteRequestsInput
    upsert?: ServiceCategoryUpsertWithoutQuoteRequestsInput
    connect?: ServiceCategoryWhereUniqueInput
    update?: XOR<XOR<ServiceCategoryUpdateToOneWithWhereWithoutQuoteRequestsInput, ServiceCategoryUpdateWithoutQuoteRequestsInput>, ServiceCategoryUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type ViennaDistrictUpdateOneRequiredWithoutQuoteRequestsNestedInput = {
    create?: XOR<ViennaDistrictCreateWithoutQuoteRequestsInput, ViennaDistrictUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: ViennaDistrictCreateOrConnectWithoutQuoteRequestsInput
    upsert?: ViennaDistrictUpsertWithoutQuoteRequestsInput
    connect?: ViennaDistrictWhereUniqueInput
    update?: XOR<XOR<ViennaDistrictUpdateToOneWithWhereWithoutQuoteRequestsInput, ViennaDistrictUpdateWithoutQuoteRequestsInput>, ViennaDistrictUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAccountUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountUserRole | EnumAccountUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AccountUserRole[]
    notIn?: $Enums.AccountUserRole[]
    not?: NestedEnumAccountUserRoleFilter<$PrismaModel> | $Enums.AccountUserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAccountUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountUserRole | EnumAccountUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AccountUserRole[]
    notIn?: $Enums.AccountUserRole[]
    not?: NestedEnumAccountUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.AccountUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountUserRoleFilter<$PrismaModel>
    _max?: NestedEnumAccountUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumServiceCategoryKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategoryKey | EnumServiceCategoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategoryKey[]
    notIn?: $Enums.ServiceCategoryKey[]
    not?: NestedEnumServiceCategoryKeyFilter<$PrismaModel> | $Enums.ServiceCategoryKey
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumCraftClassificationFilter<$PrismaModel = never> = {
    equals?: $Enums.CraftClassification | EnumCraftClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.CraftClassification[]
    notIn?: $Enums.CraftClassification[]
    not?: NestedEnumCraftClassificationFilter<$PrismaModel> | $Enums.CraftClassification
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumServiceCategoryKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategoryKey | EnumServiceCategoryKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategoryKey[]
    notIn?: $Enums.ServiceCategoryKey[]
    not?: NestedEnumServiceCategoryKeyWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategoryKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryKeyFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryKeyFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumCraftClassificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CraftClassification | EnumCraftClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.CraftClassification[]
    notIn?: $Enums.CraftClassification[]
    not?: NestedEnumCraftClassificationWithAggregatesFilter<$PrismaModel> | $Enums.CraftClassification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCraftClassificationFilter<$PrismaModel>
    _max?: NestedEnumCraftClassificationFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLogisticsZoneFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsZone | EnumLogisticsZoneFieldRefInput<$PrismaModel>
    in?: $Enums.LogisticsZone[]
    notIn?: $Enums.LogisticsZone[]
    not?: NestedEnumLogisticsZoneFilter<$PrismaModel> | $Enums.LogisticsZone
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumLogisticsZoneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsZone | EnumLogisticsZoneFieldRefInput<$PrismaModel>
    in?: $Enums.LogisticsZone[]
    notIn?: $Enums.LogisticsZone[]
    not?: NestedEnumLogisticsZoneWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsZone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogisticsZoneFilter<$PrismaModel>
    _max?: NestedEnumLogisticsZoneFilter<$PrismaModel>
  }

  export type NestedEnumChecklistItemKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistItemKey | EnumChecklistItemKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistItemKey[]
    notIn?: $Enums.ChecklistItemKey[]
    not?: NestedEnumChecklistItemKeyFilter<$PrismaModel> | $Enums.ChecklistItemKey
  }

  export type NestedEnumChecklistStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistStatus | EnumChecklistStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistStatus[]
    notIn?: $Enums.ChecklistStatus[]
    not?: NestedEnumChecklistStatusFilter<$PrismaModel> | $Enums.ChecklistStatus
  }

  export type NestedEnumChecklistItemKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistItemKey | EnumChecklistItemKeyFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistItemKey[]
    notIn?: $Enums.ChecklistItemKey[]
    not?: NestedEnumChecklistItemKeyWithAggregatesFilter<$PrismaModel> | $Enums.ChecklistItemKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChecklistItemKeyFilter<$PrismaModel>
    _max?: NestedEnumChecklistItemKeyFilter<$PrismaModel>
  }

  export type NestedEnumChecklistStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChecklistStatus | EnumChecklistStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChecklistStatus[]
    notIn?: $Enums.ChecklistStatus[]
    not?: NestedEnumChecklistStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChecklistStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChecklistStatusFilter<$PrismaModel>
    _max?: NestedEnumChecklistStatusFilter<$PrismaModel>
  }

  export type NestedEnumFaqCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.FaqCategory | EnumFaqCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FaqCategory[]
    notIn?: $Enums.FaqCategory[]
    not?: NestedEnumFaqCategoryFilter<$PrismaModel> | $Enums.FaqCategory
  }

  export type NestedEnumFaqCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaqCategory | EnumFaqCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FaqCategory[]
    notIn?: $Enums.FaqCategory[]
    not?: NestedEnumFaqCategoryWithAggregatesFilter<$PrismaModel> | $Enums.FaqCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaqCategoryFilter<$PrismaModel>
    _max?: NestedEnumFaqCategoryFilter<$PrismaModel>
  }

  export type NestedEnumPreferredTimeSlotFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredTimeSlot | EnumPreferredTimeSlotFieldRefInput<$PrismaModel>
    in?: $Enums.PreferredTimeSlot[]
    notIn?: $Enums.PreferredTimeSlot[]
    not?: NestedEnumPreferredTimeSlotFilter<$PrismaModel> | $Enums.PreferredTimeSlot
  }

  export type NestedEnumSubmissionLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionLanguage | EnumSubmissionLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionLanguage[]
    notIn?: $Enums.SubmissionLanguage[]
    not?: NestedEnumSubmissionLanguageFilter<$PrismaModel> | $Enums.SubmissionLanguage
  }

  export type NestedEnumQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | EnumQuoteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuoteStatus[]
    notIn?: $Enums.QuoteStatus[]
    not?: NestedEnumQuoteStatusFilter<$PrismaModel> | $Enums.QuoteStatus
  }

  export type NestedEnumPreferredTimeSlotWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferredTimeSlot | EnumPreferredTimeSlotFieldRefInput<$PrismaModel>
    in?: $Enums.PreferredTimeSlot[]
    notIn?: $Enums.PreferredTimeSlot[]
    not?: NestedEnumPreferredTimeSlotWithAggregatesFilter<$PrismaModel> | $Enums.PreferredTimeSlot
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferredTimeSlotFilter<$PrismaModel>
    _max?: NestedEnumPreferredTimeSlotFilter<$PrismaModel>
  }

  export type NestedEnumSubmissionLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionLanguage | EnumSubmissionLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionLanguage[]
    notIn?: $Enums.SubmissionLanguage[]
    not?: NestedEnumSubmissionLanguageWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionLanguage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionLanguageFilter<$PrismaModel>
    _max?: NestedEnumSubmissionLanguageFilter<$PrismaModel>
  }

  export type NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | EnumQuoteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuoteStatus[]
    notIn?: $Enums.QuoteStatus[]
    not?: NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuoteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuoteStatusFilter<$PrismaModel>
    _max?: NestedEnumQuoteStatusFilter<$PrismaModel>
  }

  export type QuoteRequestCreateWithoutCustomerInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceCategory: ServiceCategoryCreateNestedOneWithoutQuoteRequestsInput
    district: ViennaDistrictCreateNestedOneWithoutQuoteRequestsInput
  }

  export type QuoteRequestUncheckedCreateWithoutCustomerInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestCreateOrConnectWithoutCustomerInput = {
    where: QuoteRequestWhereUniqueInput
    create: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput>
  }

  export type QuoteRequestCreateManyCustomerInputEnvelope = {
    data: QuoteRequestCreateManyCustomerInput | QuoteRequestCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type QuoteRequestUpsertWithWhereUniqueWithoutCustomerInput = {
    where: QuoteRequestWhereUniqueInput
    update: XOR<QuoteRequestUpdateWithoutCustomerInput, QuoteRequestUncheckedUpdateWithoutCustomerInput>
    create: XOR<QuoteRequestCreateWithoutCustomerInput, QuoteRequestUncheckedCreateWithoutCustomerInput>
  }

  export type QuoteRequestUpdateWithWhereUniqueWithoutCustomerInput = {
    where: QuoteRequestWhereUniqueInput
    data: XOR<QuoteRequestUpdateWithoutCustomerInput, QuoteRequestUncheckedUpdateWithoutCustomerInput>
  }

  export type QuoteRequestUpdateManyWithWhereWithoutCustomerInput = {
    where: QuoteRequestScalarWhereInput
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyWithoutCustomerInput>
  }

  export type QuoteRequestScalarWhereInput = {
    AND?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
    OR?: QuoteRequestScalarWhereInput[]
    NOT?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
    id?: StringFilter<"QuoteRequest"> | string
    trackingCode?: StringFilter<"QuoteRequest"> | string
    customerId?: StringNullableFilter<"QuoteRequest"> | string | null
    clientName?: StringFilter<"QuoteRequest"> | string
    clientPhone?: StringFilter<"QuoteRequest"> | string
    clientEmail?: StringFilter<"QuoteRequest"> | string
    serviceCategoryId?: StringFilter<"QuoteRequest"> | string
    districtId?: StringFilter<"QuoteRequest"> | string
    addressSnippet?: StringFilter<"QuoteRequest"> | string
    taskTitle?: StringFilter<"QuoteRequest"> | string
    taskDescription?: StringFilter<"QuoteRequest"> | string
    estimatedHours?: IntFilter<"QuoteRequest"> | number
    estimatedBudgetEur?: DecimalFilter<"QuoteRequest"> | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFilter<"QuoteRequest"> | string
    preferredTimeSlot?: EnumPreferredTimeSlotFilter<"QuoteRequest"> | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFilter<"QuoteRequest"> | boolean
    agreedToTerms?: BoolFilter<"QuoteRequest"> | boolean
    submissionLang?: EnumSubmissionLanguageFilter<"QuoteRequest"> | $Enums.SubmissionLanguage
    isUrgent?: BoolFilter<"QuoteRequest"> | boolean
    status?: EnumQuoteStatusFilter<"QuoteRequest"> | $Enums.QuoteStatus
    createdAtFormatted?: StringNullableFilter<"QuoteRequest"> | string | null
    scopeNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    updatedAt?: DateTimeFilter<"QuoteRequest"> | Date | string
  }

  export type QuoteRequestCreateWithoutServiceCategoryInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: AccountUserCreateNestedOneWithoutQuoteRequestsInput
    district: ViennaDistrictCreateNestedOneWithoutQuoteRequestsInput
  }

  export type QuoteRequestUncheckedCreateWithoutServiceCategoryInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestCreateOrConnectWithoutServiceCategoryInput = {
    where: QuoteRequestWhereUniqueInput
    create: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput>
  }

  export type QuoteRequestCreateManyServiceCategoryInputEnvelope = {
    data: QuoteRequestCreateManyServiceCategoryInput | QuoteRequestCreateManyServiceCategoryInput[]
    skipDuplicates?: boolean
  }

  export type QuoteRequestUpsertWithWhereUniqueWithoutServiceCategoryInput = {
    where: QuoteRequestWhereUniqueInput
    update: XOR<QuoteRequestUpdateWithoutServiceCategoryInput, QuoteRequestUncheckedUpdateWithoutServiceCategoryInput>
    create: XOR<QuoteRequestCreateWithoutServiceCategoryInput, QuoteRequestUncheckedCreateWithoutServiceCategoryInput>
  }

  export type QuoteRequestUpdateWithWhereUniqueWithoutServiceCategoryInput = {
    where: QuoteRequestWhereUniqueInput
    data: XOR<QuoteRequestUpdateWithoutServiceCategoryInput, QuoteRequestUncheckedUpdateWithoutServiceCategoryInput>
  }

  export type QuoteRequestUpdateManyWithWhereWithoutServiceCategoryInput = {
    where: QuoteRequestScalarWhereInput
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyWithoutServiceCategoryInput>
  }

  export type QuoteRequestCreateWithoutDistrictInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: AccountUserCreateNestedOneWithoutQuoteRequestsInput
    serviceCategory: ServiceCategoryCreateNestedOneWithoutQuoteRequestsInput
  }

  export type QuoteRequestUncheckedCreateWithoutDistrictInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestCreateOrConnectWithoutDistrictInput = {
    where: QuoteRequestWhereUniqueInput
    create: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput>
  }

  export type QuoteRequestCreateManyDistrictInputEnvelope = {
    data: QuoteRequestCreateManyDistrictInput | QuoteRequestCreateManyDistrictInput[]
    skipDuplicates?: boolean
  }

  export type QuoteRequestUpsertWithWhereUniqueWithoutDistrictInput = {
    where: QuoteRequestWhereUniqueInput
    update: XOR<QuoteRequestUpdateWithoutDistrictInput, QuoteRequestUncheckedUpdateWithoutDistrictInput>
    create: XOR<QuoteRequestCreateWithoutDistrictInput, QuoteRequestUncheckedCreateWithoutDistrictInput>
  }

  export type QuoteRequestUpdateWithWhereUniqueWithoutDistrictInput = {
    where: QuoteRequestWhereUniqueInput
    data: XOR<QuoteRequestUpdateWithoutDistrictInput, QuoteRequestUncheckedUpdateWithoutDistrictInput>
  }

  export type QuoteRequestUpdateManyWithWhereWithoutDistrictInput = {
    where: QuoteRequestScalarWhereInput
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyWithoutDistrictInput>
  }

  export type AccountUserCreateWithoutQuoteRequestsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AccountUserRole
    fullName: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUserUncheckedCreateWithoutQuoteRequestsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AccountUserRole
    fullName: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUserCreateOrConnectWithoutQuoteRequestsInput = {
    where: AccountUserWhereUniqueInput
    create: XOR<AccountUserCreateWithoutQuoteRequestsInput, AccountUserUncheckedCreateWithoutQuoteRequestsInput>
  }

  export type ServiceCategoryCreateWithoutQuoteRequestsInput = {
    id?: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal | DecimalJsLike | number | string
    typicalRangeEur: string
    craftClassification?: $Enums.CraftClassification
    leadArtisan?: string | null
    isFeatured?: boolean
    descriptionDe?: string | null
    descriptionEn?: string | null
    descriptionRu?: string | null
    imageUrl?: string | null
    iconName?: string | null
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryUncheckedCreateWithoutQuoteRequestsInput = {
    id?: string
    key: $Enums.ServiceCategoryKey
    titleDe: string
    titleEn: string
    titleRu: string
    baselineHourlyRate: Decimal | DecimalJsLike | number | string
    typicalRangeEur: string
    craftClassification?: $Enums.CraftClassification
    leadArtisan?: string | null
    isFeatured?: boolean
    descriptionDe?: string | null
    descriptionEn?: string | null
    descriptionRu?: string | null
    imageUrl?: string | null
    iconName?: string | null
    displayOrder?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryCreateOrConnectWithoutQuoteRequestsInput = {
    where: ServiceCategoryWhereUniqueInput
    create: XOR<ServiceCategoryCreateWithoutQuoteRequestsInput, ServiceCategoryUncheckedCreateWithoutQuoteRequestsInput>
  }

  export type ViennaDistrictCreateWithoutQuoteRequestsInput = {
    id?: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViennaDistrictUncheckedCreateWithoutQuoteRequestsInput = {
    id?: string
    districtCode: string
    districtName: string
    districtNumber: number
    zone: $Enums.LogisticsZone
    leadTimeHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViennaDistrictCreateOrConnectWithoutQuoteRequestsInput = {
    where: ViennaDistrictWhereUniqueInput
    create: XOR<ViennaDistrictCreateWithoutQuoteRequestsInput, ViennaDistrictUncheckedCreateWithoutQuoteRequestsInput>
  }

  export type AccountUserUpsertWithoutQuoteRequestsInput = {
    update: XOR<AccountUserUpdateWithoutQuoteRequestsInput, AccountUserUncheckedUpdateWithoutQuoteRequestsInput>
    create: XOR<AccountUserCreateWithoutQuoteRequestsInput, AccountUserUncheckedCreateWithoutQuoteRequestsInput>
    where?: AccountUserWhereInput
  }

  export type AccountUserUpdateToOneWithWhereWithoutQuoteRequestsInput = {
    where?: AccountUserWhereInput
    data: XOR<AccountUserUpdateWithoutQuoteRequestsInput, AccountUserUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type AccountUserUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUserUncheckedUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAccountUserRoleFieldUpdateOperationsInput | $Enums.AccountUserRole
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUpsertWithoutQuoteRequestsInput = {
    update: XOR<ServiceCategoryUpdateWithoutQuoteRequestsInput, ServiceCategoryUncheckedUpdateWithoutQuoteRequestsInput>
    create: XOR<ServiceCategoryCreateWithoutQuoteRequestsInput, ServiceCategoryUncheckedCreateWithoutQuoteRequestsInput>
    where?: ServiceCategoryWhereInput
  }

  export type ServiceCategoryUpdateToOneWithWhereWithoutQuoteRequestsInput = {
    where?: ServiceCategoryWhereInput
    data: XOR<ServiceCategoryUpdateWithoutQuoteRequestsInput, ServiceCategoryUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type ServiceCategoryUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUncheckedUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumServiceCategoryKeyFieldUpdateOperationsInput | $Enums.ServiceCategoryKey
    titleDe?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    titleRu?: StringFieldUpdateOperationsInput | string
    baselineHourlyRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    typicalRangeEur?: StringFieldUpdateOperationsInput | string
    craftClassification?: EnumCraftClassificationFieldUpdateOperationsInput | $Enums.CraftClassification
    leadArtisan?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    descriptionDe?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEn?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionRu?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    iconName?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViennaDistrictUpsertWithoutQuoteRequestsInput = {
    update: XOR<ViennaDistrictUpdateWithoutQuoteRequestsInput, ViennaDistrictUncheckedUpdateWithoutQuoteRequestsInput>
    create: XOR<ViennaDistrictCreateWithoutQuoteRequestsInput, ViennaDistrictUncheckedCreateWithoutQuoteRequestsInput>
    where?: ViennaDistrictWhereInput
  }

  export type ViennaDistrictUpdateToOneWithWhereWithoutQuoteRequestsInput = {
    where?: ViennaDistrictWhereInput
    data: XOR<ViennaDistrictUpdateWithoutQuoteRequestsInput, ViennaDistrictUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type ViennaDistrictUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViennaDistrictUncheckedUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    districtCode?: StringFieldUpdateOperationsInput | string
    districtName?: StringFieldUpdateOperationsInput | string
    districtNumber?: IntFieldUpdateOperationsInput | number
    zone?: EnumLogisticsZoneFieldUpdateOperationsInput | $Enums.LogisticsZone
    leadTimeHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestCreateManyCustomerInput = {
    id?: string
    trackingCode: string
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceCategory?: ServiceCategoryUpdateOneRequiredWithoutQuoteRequestsNestedInput
    district?: ViennaDistrictUpdateOneRequiredWithoutQuoteRequestsNestedInput
  }

  export type QuoteRequestUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestCreateManyServiceCategoryInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    districtId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestUpdateWithoutServiceCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: AccountUserUpdateOneWithoutQuoteRequestsNestedInput
    district?: ViennaDistrictUpdateOneRequiredWithoutQuoteRequestsNestedInput
  }

  export type QuoteRequestUncheckedUpdateWithoutServiceCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestUncheckedUpdateManyWithoutServiceCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestCreateManyDistrictInput = {
    id?: string
    trackingCode: string
    customerId?: string | null
    clientName: string
    clientPhone: string
    clientEmail: string
    serviceCategoryId: string
    addressSnippet: string
    taskTitle: string
    taskDescription: string
    estimatedHours: number
    estimatedBudgetEur: Decimal | DecimalJsLike | number | string
    preferredDate: string
    preferredTimeSlot?: $Enums.PreferredTimeSlot
    hasMaterials?: boolean
    agreedToTerms?: boolean
    submissionLang?: $Enums.SubmissionLanguage
    isUrgent?: boolean
    status?: $Enums.QuoteStatus
    createdAtFormatted?: string | null
    scopeNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteRequestUpdateWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: AccountUserUpdateOneWithoutQuoteRequestsNestedInput
    serviceCategory?: ServiceCategoryUpdateOneRequiredWithoutQuoteRequestsNestedInput
  }

  export type QuoteRequestUncheckedUpdateWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestUncheckedUpdateManyWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    serviceCategoryId?: StringFieldUpdateOperationsInput | string
    addressSnippet?: StringFieldUpdateOperationsInput | string
    taskTitle?: StringFieldUpdateOperationsInput | string
    taskDescription?: StringFieldUpdateOperationsInput | string
    estimatedHours?: IntFieldUpdateOperationsInput | number
    estimatedBudgetEur?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    preferredDate?: StringFieldUpdateOperationsInput | string
    preferredTimeSlot?: EnumPreferredTimeSlotFieldUpdateOperationsInput | $Enums.PreferredTimeSlot
    hasMaterials?: BoolFieldUpdateOperationsInput | boolean
    agreedToTerms?: BoolFieldUpdateOperationsInput | boolean
    submissionLang?: EnumSubmissionLanguageFieldUpdateOperationsInput | $Enums.SubmissionLanguage
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumQuoteStatusFieldUpdateOperationsInput | $Enums.QuoteStatus
    createdAtFormatted?: NullableStringFieldUpdateOperationsInput | string | null
    scopeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}