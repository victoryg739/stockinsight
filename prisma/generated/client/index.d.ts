
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model beta_us
 * 
 */
export type beta_us = $Result.DefaultSelection<Prisma.$beta_usPayload>
/**
 * Model country_risk_premium
 * 
 */
export type country_risk_premium = $Result.DefaultSelection<Prisma.$country_risk_premiumPayload>
/**
 * Model data_last_update
 * 
 */
export type data_last_update = $Result.DefaultSelection<Prisma.$data_last_updatePayload>
/**
 * Model ebit_growth
 * 
 */
export type ebit_growth = $Result.DefaultSelection<Prisma.$ebit_growthPayload>
/**
 * Model pe_ratio_us
 * 
 */
export type pe_ratio_us = $Result.DefaultSelection<Prisma.$pe_ratio_usPayload>
/**
 * Model rev_growth_rate
 * 
 */
export type rev_growth_rate = $Result.DefaultSelection<Prisma.$rev_growth_ratePayload>
/**
 * Model sales_to_cap_us
 * 
 */
export type sales_to_cap_us = $Result.DefaultSelection<Prisma.$sales_to_cap_usPayload>
/**
 * Model effective_tax_rate
 * 
 */
export type effective_tax_rate = $Result.DefaultSelection<Prisma.$effective_tax_ratePayload>
/**
 * Model default_spread_large_firm
 * 
 */
export type default_spread_large_firm = $Result.DefaultSelection<Prisma.$default_spread_large_firmPayload>
/**
 * Model default_spread_small_firm
 * 
 */
export type default_spread_small_firm = $Result.DefaultSelection<Prisma.$default_spread_small_firmPayload>
/**
 * Model input_stats
 * 
 */
export type input_stats = $Result.DefaultSelection<Prisma.$input_statsPayload>
/**
 * Model valuation
 * 
 */
export type valuation = $Result.DefaultSelection<Prisma.$valuationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Beta_uses
 * const beta_uses = await prisma.beta_us.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Beta_uses
   * const beta_uses = await prisma.beta_us.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.beta_us`: Exposes CRUD operations for the **beta_us** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Beta_uses
    * const beta_uses = await prisma.beta_us.findMany()
    * ```
    */
  get beta_us(): Prisma.beta_usDelegate<ExtArgs>;

  /**
   * `prisma.country_risk_premium`: Exposes CRUD operations for the **country_risk_premium** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Country_risk_premiums
    * const country_risk_premiums = await prisma.country_risk_premium.findMany()
    * ```
    */
  get country_risk_premium(): Prisma.country_risk_premiumDelegate<ExtArgs>;

  /**
   * `prisma.data_last_update`: Exposes CRUD operations for the **data_last_update** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Data_last_updates
    * const data_last_updates = await prisma.data_last_update.findMany()
    * ```
    */
  get data_last_update(): Prisma.data_last_updateDelegate<ExtArgs>;

  /**
   * `prisma.ebit_growth`: Exposes CRUD operations for the **ebit_growth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ebit_growths
    * const ebit_growths = await prisma.ebit_growth.findMany()
    * ```
    */
  get ebit_growth(): Prisma.ebit_growthDelegate<ExtArgs>;

  /**
   * `prisma.pe_ratio_us`: Exposes CRUD operations for the **pe_ratio_us** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pe_ratio_uses
    * const pe_ratio_uses = await prisma.pe_ratio_us.findMany()
    * ```
    */
  get pe_ratio_us(): Prisma.pe_ratio_usDelegate<ExtArgs>;

  /**
   * `prisma.rev_growth_rate`: Exposes CRUD operations for the **rev_growth_rate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rev_growth_rates
    * const rev_growth_rates = await prisma.rev_growth_rate.findMany()
    * ```
    */
  get rev_growth_rate(): Prisma.rev_growth_rateDelegate<ExtArgs>;

  /**
   * `prisma.sales_to_cap_us`: Exposes CRUD operations for the **sales_to_cap_us** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales_to_cap_uses
    * const sales_to_cap_uses = await prisma.sales_to_cap_us.findMany()
    * ```
    */
  get sales_to_cap_us(): Prisma.sales_to_cap_usDelegate<ExtArgs>;

  /**
   * `prisma.effective_tax_rate`: Exposes CRUD operations for the **effective_tax_rate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Effective_tax_rates
    * const effective_tax_rates = await prisma.effective_tax_rate.findMany()
    * ```
    */
  get effective_tax_rate(): Prisma.effective_tax_rateDelegate<ExtArgs>;

  /**
   * `prisma.default_spread_large_firm`: Exposes CRUD operations for the **default_spread_large_firm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Default_spread_large_firms
    * const default_spread_large_firms = await prisma.default_spread_large_firm.findMany()
    * ```
    */
  get default_spread_large_firm(): Prisma.default_spread_large_firmDelegate<ExtArgs>;

  /**
   * `prisma.default_spread_small_firm`: Exposes CRUD operations for the **default_spread_small_firm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Default_spread_small_firms
    * const default_spread_small_firms = await prisma.default_spread_small_firm.findMany()
    * ```
    */
  get default_spread_small_firm(): Prisma.default_spread_small_firmDelegate<ExtArgs>;

  /**
   * `prisma.input_stats`: Exposes CRUD operations for the **input_stats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Input_stats
    * const input_stats = await prisma.input_stats.findMany()
    * ```
    */
  get input_stats(): Prisma.input_statsDelegate<ExtArgs>;

  /**
   * `prisma.valuation`: Exposes CRUD operations for the **valuation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Valuations
    * const valuations = await prisma.valuation.findMany()
    * ```
    */
  get valuation(): Prisma.valuationDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    beta_us: 'beta_us',
    country_risk_premium: 'country_risk_premium',
    data_last_update: 'data_last_update',
    ebit_growth: 'ebit_growth',
    pe_ratio_us: 'pe_ratio_us',
    rev_growth_rate: 'rev_growth_rate',
    sales_to_cap_us: 'sales_to_cap_us',
    effective_tax_rate: 'effective_tax_rate',
    default_spread_large_firm: 'default_spread_large_firm',
    default_spread_small_firm: 'default_spread_small_firm',
    input_stats: 'input_stats',
    valuation: 'valuation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "beta_us" | "country_risk_premium" | "data_last_update" | "ebit_growth" | "pe_ratio_us" | "rev_growth_rate" | "sales_to_cap_us" | "effective_tax_rate" | "default_spread_large_firm" | "default_spread_small_firm" | "input_stats" | "valuation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      beta_us: {
        payload: Prisma.$beta_usPayload<ExtArgs>
        fields: Prisma.beta_usFieldRefs
        operations: {
          findUnique: {
            args: Prisma.beta_usFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.beta_usFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          findFirst: {
            args: Prisma.beta_usFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.beta_usFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          findMany: {
            args: Prisma.beta_usFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>[]
          }
          create: {
            args: Prisma.beta_usCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          createMany: {
            args: Prisma.beta_usCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.beta_usCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>[]
          }
          delete: {
            args: Prisma.beta_usDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          update: {
            args: Prisma.beta_usUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          deleteMany: {
            args: Prisma.beta_usDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.beta_usUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.beta_usUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$beta_usPayload>
          }
          aggregate: {
            args: Prisma.Beta_usAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBeta_us>
          }
          groupBy: {
            args: Prisma.beta_usGroupByArgs<ExtArgs>
            result: $Utils.Optional<Beta_usGroupByOutputType>[]
          }
          count: {
            args: Prisma.beta_usCountArgs<ExtArgs>
            result: $Utils.Optional<Beta_usCountAggregateOutputType> | number
          }
        }
      }
      country_risk_premium: {
        payload: Prisma.$country_risk_premiumPayload<ExtArgs>
        fields: Prisma.country_risk_premiumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.country_risk_premiumFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.country_risk_premiumFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          findFirst: {
            args: Prisma.country_risk_premiumFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.country_risk_premiumFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          findMany: {
            args: Prisma.country_risk_premiumFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>[]
          }
          create: {
            args: Prisma.country_risk_premiumCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          createMany: {
            args: Prisma.country_risk_premiumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.country_risk_premiumCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>[]
          }
          delete: {
            args: Prisma.country_risk_premiumDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          update: {
            args: Prisma.country_risk_premiumUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          deleteMany: {
            args: Prisma.country_risk_premiumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.country_risk_premiumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.country_risk_premiumUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$country_risk_premiumPayload>
          }
          aggregate: {
            args: Prisma.Country_risk_premiumAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry_risk_premium>
          }
          groupBy: {
            args: Prisma.country_risk_premiumGroupByArgs<ExtArgs>
            result: $Utils.Optional<Country_risk_premiumGroupByOutputType>[]
          }
          count: {
            args: Prisma.country_risk_premiumCountArgs<ExtArgs>
            result: $Utils.Optional<Country_risk_premiumCountAggregateOutputType> | number
          }
        }
      }
      data_last_update: {
        payload: Prisma.$data_last_updatePayload<ExtArgs>
        fields: Prisma.data_last_updateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.data_last_updateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.data_last_updateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          findFirst: {
            args: Prisma.data_last_updateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.data_last_updateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          findMany: {
            args: Prisma.data_last_updateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>[]
          }
          create: {
            args: Prisma.data_last_updateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          createMany: {
            args: Prisma.data_last_updateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.data_last_updateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>[]
          }
          delete: {
            args: Prisma.data_last_updateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          update: {
            args: Prisma.data_last_updateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          deleteMany: {
            args: Prisma.data_last_updateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.data_last_updateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.data_last_updateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_last_updatePayload>
          }
          aggregate: {
            args: Prisma.Data_last_updateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateData_last_update>
          }
          groupBy: {
            args: Prisma.data_last_updateGroupByArgs<ExtArgs>
            result: $Utils.Optional<Data_last_updateGroupByOutputType>[]
          }
          count: {
            args: Prisma.data_last_updateCountArgs<ExtArgs>
            result: $Utils.Optional<Data_last_updateCountAggregateOutputType> | number
          }
        }
      }
      ebit_growth: {
        payload: Prisma.$ebit_growthPayload<ExtArgs>
        fields: Prisma.ebit_growthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ebit_growthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ebit_growthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          findFirst: {
            args: Prisma.ebit_growthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ebit_growthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          findMany: {
            args: Prisma.ebit_growthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>[]
          }
          create: {
            args: Prisma.ebit_growthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          createMany: {
            args: Prisma.ebit_growthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ebit_growthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>[]
          }
          delete: {
            args: Prisma.ebit_growthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          update: {
            args: Prisma.ebit_growthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          deleteMany: {
            args: Prisma.ebit_growthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ebit_growthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ebit_growthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ebit_growthPayload>
          }
          aggregate: {
            args: Prisma.Ebit_growthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEbit_growth>
          }
          groupBy: {
            args: Prisma.ebit_growthGroupByArgs<ExtArgs>
            result: $Utils.Optional<Ebit_growthGroupByOutputType>[]
          }
          count: {
            args: Prisma.ebit_growthCountArgs<ExtArgs>
            result: $Utils.Optional<Ebit_growthCountAggregateOutputType> | number
          }
        }
      }
      pe_ratio_us: {
        payload: Prisma.$pe_ratio_usPayload<ExtArgs>
        fields: Prisma.pe_ratio_usFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pe_ratio_usFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pe_ratio_usFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          findFirst: {
            args: Prisma.pe_ratio_usFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pe_ratio_usFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          findMany: {
            args: Prisma.pe_ratio_usFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>[]
          }
          create: {
            args: Prisma.pe_ratio_usCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          createMany: {
            args: Prisma.pe_ratio_usCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pe_ratio_usCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>[]
          }
          delete: {
            args: Prisma.pe_ratio_usDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          update: {
            args: Prisma.pe_ratio_usUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          deleteMany: {
            args: Prisma.pe_ratio_usDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pe_ratio_usUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.pe_ratio_usUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pe_ratio_usPayload>
          }
          aggregate: {
            args: Prisma.Pe_ratio_usAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePe_ratio_us>
          }
          groupBy: {
            args: Prisma.pe_ratio_usGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pe_ratio_usGroupByOutputType>[]
          }
          count: {
            args: Prisma.pe_ratio_usCountArgs<ExtArgs>
            result: $Utils.Optional<Pe_ratio_usCountAggregateOutputType> | number
          }
        }
      }
      rev_growth_rate: {
        payload: Prisma.$rev_growth_ratePayload<ExtArgs>
        fields: Prisma.rev_growth_rateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rev_growth_rateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rev_growth_rateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          findFirst: {
            args: Prisma.rev_growth_rateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rev_growth_rateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          findMany: {
            args: Prisma.rev_growth_rateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>[]
          }
          create: {
            args: Prisma.rev_growth_rateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          createMany: {
            args: Prisma.rev_growth_rateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rev_growth_rateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>[]
          }
          delete: {
            args: Prisma.rev_growth_rateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          update: {
            args: Prisma.rev_growth_rateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          deleteMany: {
            args: Prisma.rev_growth_rateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rev_growth_rateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.rev_growth_rateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rev_growth_ratePayload>
          }
          aggregate: {
            args: Prisma.Rev_growth_rateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRev_growth_rate>
          }
          groupBy: {
            args: Prisma.rev_growth_rateGroupByArgs<ExtArgs>
            result: $Utils.Optional<Rev_growth_rateGroupByOutputType>[]
          }
          count: {
            args: Prisma.rev_growth_rateCountArgs<ExtArgs>
            result: $Utils.Optional<Rev_growth_rateCountAggregateOutputType> | number
          }
        }
      }
      sales_to_cap_us: {
        payload: Prisma.$sales_to_cap_usPayload<ExtArgs>
        fields: Prisma.sales_to_cap_usFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sales_to_cap_usFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sales_to_cap_usFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          findFirst: {
            args: Prisma.sales_to_cap_usFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sales_to_cap_usFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          findMany: {
            args: Prisma.sales_to_cap_usFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>[]
          }
          create: {
            args: Prisma.sales_to_cap_usCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          createMany: {
            args: Prisma.sales_to_cap_usCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sales_to_cap_usCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>[]
          }
          delete: {
            args: Prisma.sales_to_cap_usDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          update: {
            args: Prisma.sales_to_cap_usUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          deleteMany: {
            args: Prisma.sales_to_cap_usDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sales_to_cap_usUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sales_to_cap_usUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sales_to_cap_usPayload>
          }
          aggregate: {
            args: Prisma.Sales_to_cap_usAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSales_to_cap_us>
          }
          groupBy: {
            args: Prisma.sales_to_cap_usGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sales_to_cap_usGroupByOutputType>[]
          }
          count: {
            args: Prisma.sales_to_cap_usCountArgs<ExtArgs>
            result: $Utils.Optional<Sales_to_cap_usCountAggregateOutputType> | number
          }
        }
      }
      effective_tax_rate: {
        payload: Prisma.$effective_tax_ratePayload<ExtArgs>
        fields: Prisma.effective_tax_rateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.effective_tax_rateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.effective_tax_rateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          findFirst: {
            args: Prisma.effective_tax_rateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.effective_tax_rateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          findMany: {
            args: Prisma.effective_tax_rateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>[]
          }
          create: {
            args: Prisma.effective_tax_rateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          createMany: {
            args: Prisma.effective_tax_rateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.effective_tax_rateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>[]
          }
          delete: {
            args: Prisma.effective_tax_rateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          update: {
            args: Prisma.effective_tax_rateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          deleteMany: {
            args: Prisma.effective_tax_rateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.effective_tax_rateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.effective_tax_rateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$effective_tax_ratePayload>
          }
          aggregate: {
            args: Prisma.Effective_tax_rateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEffective_tax_rate>
          }
          groupBy: {
            args: Prisma.effective_tax_rateGroupByArgs<ExtArgs>
            result: $Utils.Optional<Effective_tax_rateGroupByOutputType>[]
          }
          count: {
            args: Prisma.effective_tax_rateCountArgs<ExtArgs>
            result: $Utils.Optional<Effective_tax_rateCountAggregateOutputType> | number
          }
        }
      }
      default_spread_large_firm: {
        payload: Prisma.$default_spread_large_firmPayload<ExtArgs>
        fields: Prisma.default_spread_large_firmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.default_spread_large_firmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.default_spread_large_firmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          findFirst: {
            args: Prisma.default_spread_large_firmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.default_spread_large_firmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          findMany: {
            args: Prisma.default_spread_large_firmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>[]
          }
          create: {
            args: Prisma.default_spread_large_firmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          createMany: {
            args: Prisma.default_spread_large_firmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.default_spread_large_firmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>[]
          }
          delete: {
            args: Prisma.default_spread_large_firmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          update: {
            args: Prisma.default_spread_large_firmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          deleteMany: {
            args: Prisma.default_spread_large_firmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.default_spread_large_firmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.default_spread_large_firmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_large_firmPayload>
          }
          aggregate: {
            args: Prisma.Default_spread_large_firmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDefault_spread_large_firm>
          }
          groupBy: {
            args: Prisma.default_spread_large_firmGroupByArgs<ExtArgs>
            result: $Utils.Optional<Default_spread_large_firmGroupByOutputType>[]
          }
          count: {
            args: Prisma.default_spread_large_firmCountArgs<ExtArgs>
            result: $Utils.Optional<Default_spread_large_firmCountAggregateOutputType> | number
          }
        }
      }
      default_spread_small_firm: {
        payload: Prisma.$default_spread_small_firmPayload<ExtArgs>
        fields: Prisma.default_spread_small_firmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.default_spread_small_firmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.default_spread_small_firmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          findFirst: {
            args: Prisma.default_spread_small_firmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.default_spread_small_firmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          findMany: {
            args: Prisma.default_spread_small_firmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>[]
          }
          create: {
            args: Prisma.default_spread_small_firmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          createMany: {
            args: Prisma.default_spread_small_firmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.default_spread_small_firmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>[]
          }
          delete: {
            args: Prisma.default_spread_small_firmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          update: {
            args: Prisma.default_spread_small_firmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          deleteMany: {
            args: Prisma.default_spread_small_firmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.default_spread_small_firmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.default_spread_small_firmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$default_spread_small_firmPayload>
          }
          aggregate: {
            args: Prisma.Default_spread_small_firmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDefault_spread_small_firm>
          }
          groupBy: {
            args: Prisma.default_spread_small_firmGroupByArgs<ExtArgs>
            result: $Utils.Optional<Default_spread_small_firmGroupByOutputType>[]
          }
          count: {
            args: Prisma.default_spread_small_firmCountArgs<ExtArgs>
            result: $Utils.Optional<Default_spread_small_firmCountAggregateOutputType> | number
          }
        }
      }
      input_stats: {
        payload: Prisma.$input_statsPayload<ExtArgs>
        fields: Prisma.input_statsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.input_statsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.input_statsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          findFirst: {
            args: Prisma.input_statsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.input_statsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          findMany: {
            args: Prisma.input_statsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>[]
          }
          create: {
            args: Prisma.input_statsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          createMany: {
            args: Prisma.input_statsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.input_statsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>[]
          }
          delete: {
            args: Prisma.input_statsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          update: {
            args: Prisma.input_statsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          deleteMany: {
            args: Prisma.input_statsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.input_statsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.input_statsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$input_statsPayload>
          }
          aggregate: {
            args: Prisma.Input_statsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInput_stats>
          }
          groupBy: {
            args: Prisma.input_statsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Input_statsGroupByOutputType>[]
          }
          count: {
            args: Prisma.input_statsCountArgs<ExtArgs>
            result: $Utils.Optional<Input_statsCountAggregateOutputType> | number
          }
        }
      }
      valuation: {
        payload: Prisma.$valuationPayload<ExtArgs>
        fields: Prisma.valuationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.valuationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.valuationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          findFirst: {
            args: Prisma.valuationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.valuationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          findMany: {
            args: Prisma.valuationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>[]
          }
          create: {
            args: Prisma.valuationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          createMany: {
            args: Prisma.valuationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.valuationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>[]
          }
          delete: {
            args: Prisma.valuationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          update: {
            args: Prisma.valuationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          deleteMany: {
            args: Prisma.valuationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.valuationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.valuationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$valuationPayload>
          }
          aggregate: {
            args: Prisma.ValuationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateValuation>
          }
          groupBy: {
            args: Prisma.valuationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ValuationGroupByOutputType>[]
          }
          count: {
            args: Prisma.valuationCountArgs<ExtArgs>
            result: $Utils.Optional<ValuationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model beta_us
   */

  export type AggregateBeta_us = {
    _count: Beta_usCountAggregateOutputType | null
    _min: Beta_usMinAggregateOutputType | null
    _max: Beta_usMaxAggregateOutputType | null
  }

  export type Beta_usMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    avg_unlevered_beta: string | null
    avg_levered_beta: string | null
    avg_correlation_with_mkt: string | null
    total_unlevered_beta: string | null
    total_levered_beta: string | null
  }

  export type Beta_usMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    avg_unlevered_beta: string | null
    avg_levered_beta: string | null
    avg_correlation_with_mkt: string | null
    total_unlevered_beta: string | null
    total_levered_beta: string | null
  }

  export type Beta_usCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    avg_unlevered_beta: number
    avg_levered_beta: number
    avg_correlation_with_mkt: number
    total_unlevered_beta: number
    total_levered_beta: number
    _all: number
  }


  export type Beta_usMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    avg_unlevered_beta?: true
    avg_levered_beta?: true
    avg_correlation_with_mkt?: true
    total_unlevered_beta?: true
    total_levered_beta?: true
  }

  export type Beta_usMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    avg_unlevered_beta?: true
    avg_levered_beta?: true
    avg_correlation_with_mkt?: true
    total_unlevered_beta?: true
    total_levered_beta?: true
  }

  export type Beta_usCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    avg_unlevered_beta?: true
    avg_levered_beta?: true
    avg_correlation_with_mkt?: true
    total_unlevered_beta?: true
    total_levered_beta?: true
    _all?: true
  }

  export type Beta_usAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which beta_us to aggregate.
     */
    where?: beta_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of beta_uses to fetch.
     */
    orderBy?: beta_usOrderByWithRelationInput | beta_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: beta_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` beta_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` beta_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned beta_uses
    **/
    _count?: true | Beta_usCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Beta_usMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Beta_usMaxAggregateInputType
  }

  export type GetBeta_usAggregateType<T extends Beta_usAggregateArgs> = {
        [P in keyof T & keyof AggregateBeta_us]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBeta_us[P]>
      : GetScalarType<T[P], AggregateBeta_us[P]>
  }




  export type beta_usGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: beta_usWhereInput
    orderBy?: beta_usOrderByWithAggregationInput | beta_usOrderByWithAggregationInput[]
    by: Beta_usScalarFieldEnum[] | Beta_usScalarFieldEnum
    having?: beta_usScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Beta_usCountAggregateInputType | true
    _min?: Beta_usMinAggregateInputType
    _max?: Beta_usMaxAggregateInputType
  }

  export type Beta_usGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    avg_unlevered_beta: string | null
    avg_levered_beta: string | null
    avg_correlation_with_mkt: string | null
    total_unlevered_beta: string | null
    total_levered_beta: string | null
    _count: Beta_usCountAggregateOutputType | null
    _min: Beta_usMinAggregateOutputType | null
    _max: Beta_usMaxAggregateOutputType | null
  }

  type GetBeta_usGroupByPayload<T extends beta_usGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Beta_usGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Beta_usGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Beta_usGroupByOutputType[P]>
            : GetScalarType<T[P], Beta_usGroupByOutputType[P]>
        }
      >
    >


  export type beta_usSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    avg_unlevered_beta?: boolean
    avg_levered_beta?: boolean
    avg_correlation_with_mkt?: boolean
    total_unlevered_beta?: boolean
    total_levered_beta?: boolean
  }, ExtArgs["result"]["beta_us"]>

  export type beta_usSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    avg_unlevered_beta?: boolean
    avg_levered_beta?: boolean
    avg_correlation_with_mkt?: boolean
    total_unlevered_beta?: boolean
    total_levered_beta?: boolean
  }, ExtArgs["result"]["beta_us"]>

  export type beta_usSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    avg_unlevered_beta?: boolean
    avg_levered_beta?: boolean
    avg_correlation_with_mkt?: boolean
    total_unlevered_beta?: boolean
    total_levered_beta?: boolean
  }


  export type $beta_usPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "beta_us"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      avg_unlevered_beta: string | null
      avg_levered_beta: string | null
      avg_correlation_with_mkt: string | null
      total_unlevered_beta: string | null
      total_levered_beta: string | null
    }, ExtArgs["result"]["beta_us"]>
    composites: {}
  }

  type beta_usGetPayload<S extends boolean | null | undefined | beta_usDefaultArgs> = $Result.GetResult<Prisma.$beta_usPayload, S>

  type beta_usCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<beta_usFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Beta_usCountAggregateInputType | true
    }

  export interface beta_usDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['beta_us'], meta: { name: 'beta_us' } }
    /**
     * Find zero or one Beta_us that matches the filter.
     * @param {beta_usFindUniqueArgs} args - Arguments to find a Beta_us
     * @example
     * // Get one Beta_us
     * const beta_us = await prisma.beta_us.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends beta_usFindUniqueArgs>(args: SelectSubset<T, beta_usFindUniqueArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Beta_us that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {beta_usFindUniqueOrThrowArgs} args - Arguments to find a Beta_us
     * @example
     * // Get one Beta_us
     * const beta_us = await prisma.beta_us.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends beta_usFindUniqueOrThrowArgs>(args: SelectSubset<T, beta_usFindUniqueOrThrowArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Beta_us that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usFindFirstArgs} args - Arguments to find a Beta_us
     * @example
     * // Get one Beta_us
     * const beta_us = await prisma.beta_us.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends beta_usFindFirstArgs>(args?: SelectSubset<T, beta_usFindFirstArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Beta_us that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usFindFirstOrThrowArgs} args - Arguments to find a Beta_us
     * @example
     * // Get one Beta_us
     * const beta_us = await prisma.beta_us.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends beta_usFindFirstOrThrowArgs>(args?: SelectSubset<T, beta_usFindFirstOrThrowArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Beta_uses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Beta_uses
     * const beta_uses = await prisma.beta_us.findMany()
     * 
     * // Get first 10 Beta_uses
     * const beta_uses = await prisma.beta_us.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const beta_usWithIndustryOnly = await prisma.beta_us.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends beta_usFindManyArgs>(args?: SelectSubset<T, beta_usFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Beta_us.
     * @param {beta_usCreateArgs} args - Arguments to create a Beta_us.
     * @example
     * // Create one Beta_us
     * const Beta_us = await prisma.beta_us.create({
     *   data: {
     *     // ... data to create a Beta_us
     *   }
     * })
     * 
     */
    create<T extends beta_usCreateArgs>(args: SelectSubset<T, beta_usCreateArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Beta_uses.
     * @param {beta_usCreateManyArgs} args - Arguments to create many Beta_uses.
     * @example
     * // Create many Beta_uses
     * const beta_us = await prisma.beta_us.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends beta_usCreateManyArgs>(args?: SelectSubset<T, beta_usCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Beta_uses and returns the data saved in the database.
     * @param {beta_usCreateManyAndReturnArgs} args - Arguments to create many Beta_uses.
     * @example
     * // Create many Beta_uses
     * const beta_us = await prisma.beta_us.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Beta_uses and only return the `industry`
     * const beta_usWithIndustryOnly = await prisma.beta_us.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends beta_usCreateManyAndReturnArgs>(args?: SelectSubset<T, beta_usCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Beta_us.
     * @param {beta_usDeleteArgs} args - Arguments to delete one Beta_us.
     * @example
     * // Delete one Beta_us
     * const Beta_us = await prisma.beta_us.delete({
     *   where: {
     *     // ... filter to delete one Beta_us
     *   }
     * })
     * 
     */
    delete<T extends beta_usDeleteArgs>(args: SelectSubset<T, beta_usDeleteArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Beta_us.
     * @param {beta_usUpdateArgs} args - Arguments to update one Beta_us.
     * @example
     * // Update one Beta_us
     * const beta_us = await prisma.beta_us.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends beta_usUpdateArgs>(args: SelectSubset<T, beta_usUpdateArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Beta_uses.
     * @param {beta_usDeleteManyArgs} args - Arguments to filter Beta_uses to delete.
     * @example
     * // Delete a few Beta_uses
     * const { count } = await prisma.beta_us.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends beta_usDeleteManyArgs>(args?: SelectSubset<T, beta_usDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beta_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Beta_uses
     * const beta_us = await prisma.beta_us.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends beta_usUpdateManyArgs>(args: SelectSubset<T, beta_usUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Beta_us.
     * @param {beta_usUpsertArgs} args - Arguments to update or create a Beta_us.
     * @example
     * // Update or create a Beta_us
     * const beta_us = await prisma.beta_us.upsert({
     *   create: {
     *     // ... data to create a Beta_us
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Beta_us we want to update
     *   }
     * })
     */
    upsert<T extends beta_usUpsertArgs>(args: SelectSubset<T, beta_usUpsertArgs<ExtArgs>>): Prisma__beta_usClient<$Result.GetResult<Prisma.$beta_usPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Beta_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usCountArgs} args - Arguments to filter Beta_uses to count.
     * @example
     * // Count the number of Beta_uses
     * const count = await prisma.beta_us.count({
     *   where: {
     *     // ... the filter for the Beta_uses we want to count
     *   }
     * })
    **/
    count<T extends beta_usCountArgs>(
      args?: Subset<T, beta_usCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Beta_usCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Beta_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Beta_usAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Beta_usAggregateArgs>(args: Subset<T, Beta_usAggregateArgs>): Prisma.PrismaPromise<GetBeta_usAggregateType<T>>

    /**
     * Group by Beta_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {beta_usGroupByArgs} args - Group by arguments.
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
      T extends beta_usGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: beta_usGroupByArgs['orderBy'] }
        : { orderBy?: beta_usGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, beta_usGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeta_usGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the beta_us model
   */
  readonly fields: beta_usFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for beta_us.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__beta_usClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the beta_us model
   */ 
  interface beta_usFieldRefs {
    readonly industry: FieldRef<"beta_us", 'String'>
    readonly no_of_firms: FieldRef<"beta_us", 'String'>
    readonly avg_unlevered_beta: FieldRef<"beta_us", 'String'>
    readonly avg_levered_beta: FieldRef<"beta_us", 'String'>
    readonly avg_correlation_with_mkt: FieldRef<"beta_us", 'String'>
    readonly total_unlevered_beta: FieldRef<"beta_us", 'String'>
    readonly total_levered_beta: FieldRef<"beta_us", 'String'>
  }
    

  // Custom InputTypes
  /**
   * beta_us findUnique
   */
  export type beta_usFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter, which beta_us to fetch.
     */
    where: beta_usWhereUniqueInput
  }

  /**
   * beta_us findUniqueOrThrow
   */
  export type beta_usFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter, which beta_us to fetch.
     */
    where: beta_usWhereUniqueInput
  }

  /**
   * beta_us findFirst
   */
  export type beta_usFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter, which beta_us to fetch.
     */
    where?: beta_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of beta_uses to fetch.
     */
    orderBy?: beta_usOrderByWithRelationInput | beta_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for beta_uses.
     */
    cursor?: beta_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` beta_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` beta_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of beta_uses.
     */
    distinct?: Beta_usScalarFieldEnum | Beta_usScalarFieldEnum[]
  }

  /**
   * beta_us findFirstOrThrow
   */
  export type beta_usFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter, which beta_us to fetch.
     */
    where?: beta_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of beta_uses to fetch.
     */
    orderBy?: beta_usOrderByWithRelationInput | beta_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for beta_uses.
     */
    cursor?: beta_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` beta_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` beta_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of beta_uses.
     */
    distinct?: Beta_usScalarFieldEnum | Beta_usScalarFieldEnum[]
  }

  /**
   * beta_us findMany
   */
  export type beta_usFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter, which beta_uses to fetch.
     */
    where?: beta_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of beta_uses to fetch.
     */
    orderBy?: beta_usOrderByWithRelationInput | beta_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing beta_uses.
     */
    cursor?: beta_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` beta_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` beta_uses.
     */
    skip?: number
    distinct?: Beta_usScalarFieldEnum | Beta_usScalarFieldEnum[]
  }

  /**
   * beta_us create
   */
  export type beta_usCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * The data needed to create a beta_us.
     */
    data: XOR<beta_usCreateInput, beta_usUncheckedCreateInput>
  }

  /**
   * beta_us createMany
   */
  export type beta_usCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many beta_uses.
     */
    data: beta_usCreateManyInput | beta_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * beta_us createManyAndReturn
   */
  export type beta_usCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many beta_uses.
     */
    data: beta_usCreateManyInput | beta_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * beta_us update
   */
  export type beta_usUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * The data needed to update a beta_us.
     */
    data: XOR<beta_usUpdateInput, beta_usUncheckedUpdateInput>
    /**
     * Choose, which beta_us to update.
     */
    where: beta_usWhereUniqueInput
  }

  /**
   * beta_us updateMany
   */
  export type beta_usUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update beta_uses.
     */
    data: XOR<beta_usUpdateManyMutationInput, beta_usUncheckedUpdateManyInput>
    /**
     * Filter which beta_uses to update
     */
    where?: beta_usWhereInput
  }

  /**
   * beta_us upsert
   */
  export type beta_usUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * The filter to search for the beta_us to update in case it exists.
     */
    where: beta_usWhereUniqueInput
    /**
     * In case the beta_us found by the `where` argument doesn't exist, create a new beta_us with this data.
     */
    create: XOR<beta_usCreateInput, beta_usUncheckedCreateInput>
    /**
     * In case the beta_us was found with the provided `where` argument, update it with this data.
     */
    update: XOR<beta_usUpdateInput, beta_usUncheckedUpdateInput>
  }

  /**
   * beta_us delete
   */
  export type beta_usDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
    /**
     * Filter which beta_us to delete.
     */
    where: beta_usWhereUniqueInput
  }

  /**
   * beta_us deleteMany
   */
  export type beta_usDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which beta_uses to delete
     */
    where?: beta_usWhereInput
  }

  /**
   * beta_us without action
   */
  export type beta_usDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the beta_us
     */
    select?: beta_usSelect<ExtArgs> | null
  }


  /**
   * Model country_risk_premium
   */

  export type AggregateCountry_risk_premium = {
    _count: Country_risk_premiumCountAggregateOutputType | null
    _min: Country_risk_premiumMinAggregateOutputType | null
    _max: Country_risk_premiumMaxAggregateOutputType | null
  }

  export type Country_risk_premiumMinAggregateOutputType = {
    country: string | null
    adj_default_spread: string | null
    equity_risk_premium: string | null
    country_risk_premium: string | null
    corporate_tax_rate: string | null
    moody_rating: string | null
    soverign_cds_spread: string | null
  }

  export type Country_risk_premiumMaxAggregateOutputType = {
    country: string | null
    adj_default_spread: string | null
    equity_risk_premium: string | null
    country_risk_premium: string | null
    corporate_tax_rate: string | null
    moody_rating: string | null
    soverign_cds_spread: string | null
  }

  export type Country_risk_premiumCountAggregateOutputType = {
    country: number
    adj_default_spread: number
    equity_risk_premium: number
    country_risk_premium: number
    corporate_tax_rate: number
    moody_rating: number
    soverign_cds_spread: number
    _all: number
  }


  export type Country_risk_premiumMinAggregateInputType = {
    country?: true
    adj_default_spread?: true
    equity_risk_premium?: true
    country_risk_premium?: true
    corporate_tax_rate?: true
    moody_rating?: true
    soverign_cds_spread?: true
  }

  export type Country_risk_premiumMaxAggregateInputType = {
    country?: true
    adj_default_spread?: true
    equity_risk_premium?: true
    country_risk_premium?: true
    corporate_tax_rate?: true
    moody_rating?: true
    soverign_cds_spread?: true
  }

  export type Country_risk_premiumCountAggregateInputType = {
    country?: true
    adj_default_spread?: true
    equity_risk_premium?: true
    country_risk_premium?: true
    corporate_tax_rate?: true
    moody_rating?: true
    soverign_cds_spread?: true
    _all?: true
  }

  export type Country_risk_premiumAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which country_risk_premium to aggregate.
     */
    where?: country_risk_premiumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of country_risk_premiums to fetch.
     */
    orderBy?: country_risk_premiumOrderByWithRelationInput | country_risk_premiumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: country_risk_premiumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` country_risk_premiums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` country_risk_premiums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned country_risk_premiums
    **/
    _count?: true | Country_risk_premiumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Country_risk_premiumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Country_risk_premiumMaxAggregateInputType
  }

  export type GetCountry_risk_premiumAggregateType<T extends Country_risk_premiumAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry_risk_premium]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry_risk_premium[P]>
      : GetScalarType<T[P], AggregateCountry_risk_premium[P]>
  }




  export type country_risk_premiumGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: country_risk_premiumWhereInput
    orderBy?: country_risk_premiumOrderByWithAggregationInput | country_risk_premiumOrderByWithAggregationInput[]
    by: Country_risk_premiumScalarFieldEnum[] | Country_risk_premiumScalarFieldEnum
    having?: country_risk_premiumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Country_risk_premiumCountAggregateInputType | true
    _min?: Country_risk_premiumMinAggregateInputType
    _max?: Country_risk_premiumMaxAggregateInputType
  }

  export type Country_risk_premiumGroupByOutputType = {
    country: string
    adj_default_spread: string | null
    equity_risk_premium: string | null
    country_risk_premium: string | null
    corporate_tax_rate: string | null
    moody_rating: string | null
    soverign_cds_spread: string | null
    _count: Country_risk_premiumCountAggregateOutputType | null
    _min: Country_risk_premiumMinAggregateOutputType | null
    _max: Country_risk_premiumMaxAggregateOutputType | null
  }

  type GetCountry_risk_premiumGroupByPayload<T extends country_risk_premiumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Country_risk_premiumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Country_risk_premiumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Country_risk_premiumGroupByOutputType[P]>
            : GetScalarType<T[P], Country_risk_premiumGroupByOutputType[P]>
        }
      >
    >


  export type country_risk_premiumSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    country?: boolean
    adj_default_spread?: boolean
    equity_risk_premium?: boolean
    country_risk_premium?: boolean
    corporate_tax_rate?: boolean
    moody_rating?: boolean
    soverign_cds_spread?: boolean
  }, ExtArgs["result"]["country_risk_premium"]>

  export type country_risk_premiumSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    country?: boolean
    adj_default_spread?: boolean
    equity_risk_premium?: boolean
    country_risk_premium?: boolean
    corporate_tax_rate?: boolean
    moody_rating?: boolean
    soverign_cds_spread?: boolean
  }, ExtArgs["result"]["country_risk_premium"]>

  export type country_risk_premiumSelectScalar = {
    country?: boolean
    adj_default_spread?: boolean
    equity_risk_premium?: boolean
    country_risk_premium?: boolean
    corporate_tax_rate?: boolean
    moody_rating?: boolean
    soverign_cds_spread?: boolean
  }


  export type $country_risk_premiumPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "country_risk_premium"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      country: string
      adj_default_spread: string | null
      equity_risk_premium: string | null
      country_risk_premium: string | null
      corporate_tax_rate: string | null
      moody_rating: string | null
      soverign_cds_spread: string | null
    }, ExtArgs["result"]["country_risk_premium"]>
    composites: {}
  }

  type country_risk_premiumGetPayload<S extends boolean | null | undefined | country_risk_premiumDefaultArgs> = $Result.GetResult<Prisma.$country_risk_premiumPayload, S>

  type country_risk_premiumCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<country_risk_premiumFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Country_risk_premiumCountAggregateInputType | true
    }

  export interface country_risk_premiumDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['country_risk_premium'], meta: { name: 'country_risk_premium' } }
    /**
     * Find zero or one Country_risk_premium that matches the filter.
     * @param {country_risk_premiumFindUniqueArgs} args - Arguments to find a Country_risk_premium
     * @example
     * // Get one Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends country_risk_premiumFindUniqueArgs>(args: SelectSubset<T, country_risk_premiumFindUniqueArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Country_risk_premium that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {country_risk_premiumFindUniqueOrThrowArgs} args - Arguments to find a Country_risk_premium
     * @example
     * // Get one Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends country_risk_premiumFindUniqueOrThrowArgs>(args: SelectSubset<T, country_risk_premiumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Country_risk_premium that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumFindFirstArgs} args - Arguments to find a Country_risk_premium
     * @example
     * // Get one Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends country_risk_premiumFindFirstArgs>(args?: SelectSubset<T, country_risk_premiumFindFirstArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Country_risk_premium that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumFindFirstOrThrowArgs} args - Arguments to find a Country_risk_premium
     * @example
     * // Get one Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends country_risk_premiumFindFirstOrThrowArgs>(args?: SelectSubset<T, country_risk_premiumFindFirstOrThrowArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Country_risk_premiums that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Country_risk_premiums
     * const country_risk_premiums = await prisma.country_risk_premium.findMany()
     * 
     * // Get first 10 Country_risk_premiums
     * const country_risk_premiums = await prisma.country_risk_premium.findMany({ take: 10 })
     * 
     * // Only select the `country`
     * const country_risk_premiumWithCountryOnly = await prisma.country_risk_premium.findMany({ select: { country: true } })
     * 
     */
    findMany<T extends country_risk_premiumFindManyArgs>(args?: SelectSubset<T, country_risk_premiumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Country_risk_premium.
     * @param {country_risk_premiumCreateArgs} args - Arguments to create a Country_risk_premium.
     * @example
     * // Create one Country_risk_premium
     * const Country_risk_premium = await prisma.country_risk_premium.create({
     *   data: {
     *     // ... data to create a Country_risk_premium
     *   }
     * })
     * 
     */
    create<T extends country_risk_premiumCreateArgs>(args: SelectSubset<T, country_risk_premiumCreateArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Country_risk_premiums.
     * @param {country_risk_premiumCreateManyArgs} args - Arguments to create many Country_risk_premiums.
     * @example
     * // Create many Country_risk_premiums
     * const country_risk_premium = await prisma.country_risk_premium.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends country_risk_premiumCreateManyArgs>(args?: SelectSubset<T, country_risk_premiumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Country_risk_premiums and returns the data saved in the database.
     * @param {country_risk_premiumCreateManyAndReturnArgs} args - Arguments to create many Country_risk_premiums.
     * @example
     * // Create many Country_risk_premiums
     * const country_risk_premium = await prisma.country_risk_premium.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Country_risk_premiums and only return the `country`
     * const country_risk_premiumWithCountryOnly = await prisma.country_risk_premium.createManyAndReturn({ 
     *   select: { country: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends country_risk_premiumCreateManyAndReturnArgs>(args?: SelectSubset<T, country_risk_premiumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Country_risk_premium.
     * @param {country_risk_premiumDeleteArgs} args - Arguments to delete one Country_risk_premium.
     * @example
     * // Delete one Country_risk_premium
     * const Country_risk_premium = await prisma.country_risk_premium.delete({
     *   where: {
     *     // ... filter to delete one Country_risk_premium
     *   }
     * })
     * 
     */
    delete<T extends country_risk_premiumDeleteArgs>(args: SelectSubset<T, country_risk_premiumDeleteArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Country_risk_premium.
     * @param {country_risk_premiumUpdateArgs} args - Arguments to update one Country_risk_premium.
     * @example
     * // Update one Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends country_risk_premiumUpdateArgs>(args: SelectSubset<T, country_risk_premiumUpdateArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Country_risk_premiums.
     * @param {country_risk_premiumDeleteManyArgs} args - Arguments to filter Country_risk_premiums to delete.
     * @example
     * // Delete a few Country_risk_premiums
     * const { count } = await prisma.country_risk_premium.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends country_risk_premiumDeleteManyArgs>(args?: SelectSubset<T, country_risk_premiumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Country_risk_premiums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Country_risk_premiums
     * const country_risk_premium = await prisma.country_risk_premium.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends country_risk_premiumUpdateManyArgs>(args: SelectSubset<T, country_risk_premiumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Country_risk_premium.
     * @param {country_risk_premiumUpsertArgs} args - Arguments to update or create a Country_risk_premium.
     * @example
     * // Update or create a Country_risk_premium
     * const country_risk_premium = await prisma.country_risk_premium.upsert({
     *   create: {
     *     // ... data to create a Country_risk_premium
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country_risk_premium we want to update
     *   }
     * })
     */
    upsert<T extends country_risk_premiumUpsertArgs>(args: SelectSubset<T, country_risk_premiumUpsertArgs<ExtArgs>>): Prisma__country_risk_premiumClient<$Result.GetResult<Prisma.$country_risk_premiumPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Country_risk_premiums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumCountArgs} args - Arguments to filter Country_risk_premiums to count.
     * @example
     * // Count the number of Country_risk_premiums
     * const count = await prisma.country_risk_premium.count({
     *   where: {
     *     // ... the filter for the Country_risk_premiums we want to count
     *   }
     * })
    **/
    count<T extends country_risk_premiumCountArgs>(
      args?: Subset<T, country_risk_premiumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Country_risk_premiumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country_risk_premium.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Country_risk_premiumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Country_risk_premiumAggregateArgs>(args: Subset<T, Country_risk_premiumAggregateArgs>): Prisma.PrismaPromise<GetCountry_risk_premiumAggregateType<T>>

    /**
     * Group by Country_risk_premium.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {country_risk_premiumGroupByArgs} args - Group by arguments.
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
      T extends country_risk_premiumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: country_risk_premiumGroupByArgs['orderBy'] }
        : { orderBy?: country_risk_premiumGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, country_risk_premiumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountry_risk_premiumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the country_risk_premium model
   */
  readonly fields: country_risk_premiumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for country_risk_premium.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__country_risk_premiumClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the country_risk_premium model
   */ 
  interface country_risk_premiumFieldRefs {
    readonly country: FieldRef<"country_risk_premium", 'String'>
    readonly adj_default_spread: FieldRef<"country_risk_premium", 'String'>
    readonly equity_risk_premium: FieldRef<"country_risk_premium", 'String'>
    readonly country_risk_premium: FieldRef<"country_risk_premium", 'String'>
    readonly corporate_tax_rate: FieldRef<"country_risk_premium", 'String'>
    readonly moody_rating: FieldRef<"country_risk_premium", 'String'>
    readonly soverign_cds_spread: FieldRef<"country_risk_premium", 'String'>
  }
    

  // Custom InputTypes
  /**
   * country_risk_premium findUnique
   */
  export type country_risk_premiumFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter, which country_risk_premium to fetch.
     */
    where: country_risk_premiumWhereUniqueInput
  }

  /**
   * country_risk_premium findUniqueOrThrow
   */
  export type country_risk_premiumFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter, which country_risk_premium to fetch.
     */
    where: country_risk_premiumWhereUniqueInput
  }

  /**
   * country_risk_premium findFirst
   */
  export type country_risk_premiumFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter, which country_risk_premium to fetch.
     */
    where?: country_risk_premiumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of country_risk_premiums to fetch.
     */
    orderBy?: country_risk_premiumOrderByWithRelationInput | country_risk_premiumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for country_risk_premiums.
     */
    cursor?: country_risk_premiumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` country_risk_premiums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` country_risk_premiums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of country_risk_premiums.
     */
    distinct?: Country_risk_premiumScalarFieldEnum | Country_risk_premiumScalarFieldEnum[]
  }

  /**
   * country_risk_premium findFirstOrThrow
   */
  export type country_risk_premiumFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter, which country_risk_premium to fetch.
     */
    where?: country_risk_premiumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of country_risk_premiums to fetch.
     */
    orderBy?: country_risk_premiumOrderByWithRelationInput | country_risk_premiumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for country_risk_premiums.
     */
    cursor?: country_risk_premiumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` country_risk_premiums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` country_risk_premiums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of country_risk_premiums.
     */
    distinct?: Country_risk_premiumScalarFieldEnum | Country_risk_premiumScalarFieldEnum[]
  }

  /**
   * country_risk_premium findMany
   */
  export type country_risk_premiumFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter, which country_risk_premiums to fetch.
     */
    where?: country_risk_premiumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of country_risk_premiums to fetch.
     */
    orderBy?: country_risk_premiumOrderByWithRelationInput | country_risk_premiumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing country_risk_premiums.
     */
    cursor?: country_risk_premiumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` country_risk_premiums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` country_risk_premiums.
     */
    skip?: number
    distinct?: Country_risk_premiumScalarFieldEnum | Country_risk_premiumScalarFieldEnum[]
  }

  /**
   * country_risk_premium create
   */
  export type country_risk_premiumCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * The data needed to create a country_risk_premium.
     */
    data: XOR<country_risk_premiumCreateInput, country_risk_premiumUncheckedCreateInput>
  }

  /**
   * country_risk_premium createMany
   */
  export type country_risk_premiumCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many country_risk_premiums.
     */
    data: country_risk_premiumCreateManyInput | country_risk_premiumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country_risk_premium createManyAndReturn
   */
  export type country_risk_premiumCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many country_risk_premiums.
     */
    data: country_risk_premiumCreateManyInput | country_risk_premiumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country_risk_premium update
   */
  export type country_risk_premiumUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * The data needed to update a country_risk_premium.
     */
    data: XOR<country_risk_premiumUpdateInput, country_risk_premiumUncheckedUpdateInput>
    /**
     * Choose, which country_risk_premium to update.
     */
    where: country_risk_premiumWhereUniqueInput
  }

  /**
   * country_risk_premium updateMany
   */
  export type country_risk_premiumUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update country_risk_premiums.
     */
    data: XOR<country_risk_premiumUpdateManyMutationInput, country_risk_premiumUncheckedUpdateManyInput>
    /**
     * Filter which country_risk_premiums to update
     */
    where?: country_risk_premiumWhereInput
  }

  /**
   * country_risk_premium upsert
   */
  export type country_risk_premiumUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * The filter to search for the country_risk_premium to update in case it exists.
     */
    where: country_risk_premiumWhereUniqueInput
    /**
     * In case the country_risk_premium found by the `where` argument doesn't exist, create a new country_risk_premium with this data.
     */
    create: XOR<country_risk_premiumCreateInput, country_risk_premiumUncheckedCreateInput>
    /**
     * In case the country_risk_premium was found with the provided `where` argument, update it with this data.
     */
    update: XOR<country_risk_premiumUpdateInput, country_risk_premiumUncheckedUpdateInput>
  }

  /**
   * country_risk_premium delete
   */
  export type country_risk_premiumDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
    /**
     * Filter which country_risk_premium to delete.
     */
    where: country_risk_premiumWhereUniqueInput
  }

  /**
   * country_risk_premium deleteMany
   */
  export type country_risk_premiumDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which country_risk_premiums to delete
     */
    where?: country_risk_premiumWhereInput
  }

  /**
   * country_risk_premium without action
   */
  export type country_risk_premiumDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country_risk_premium
     */
    select?: country_risk_premiumSelect<ExtArgs> | null
  }


  /**
   * Model data_last_update
   */

  export type AggregateData_last_update = {
    _count: Data_last_updateCountAggregateOutputType | null
    _min: Data_last_updateMinAggregateOutputType | null
    _max: Data_last_updateMaxAggregateOutputType | null
  }

  export type Data_last_updateMinAggregateOutputType = {
    data_name: string | null
    last_update: Date | null
  }

  export type Data_last_updateMaxAggregateOutputType = {
    data_name: string | null
    last_update: Date | null
  }

  export type Data_last_updateCountAggregateOutputType = {
    data_name: number
    last_update: number
    _all: number
  }


  export type Data_last_updateMinAggregateInputType = {
    data_name?: true
    last_update?: true
  }

  export type Data_last_updateMaxAggregateInputType = {
    data_name?: true
    last_update?: true
  }

  export type Data_last_updateCountAggregateInputType = {
    data_name?: true
    last_update?: true
    _all?: true
  }

  export type Data_last_updateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data_last_update to aggregate.
     */
    where?: data_last_updateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_last_updates to fetch.
     */
    orderBy?: data_last_updateOrderByWithRelationInput | data_last_updateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: data_last_updateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_last_updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_last_updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned data_last_updates
    **/
    _count?: true | Data_last_updateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Data_last_updateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Data_last_updateMaxAggregateInputType
  }

  export type GetData_last_updateAggregateType<T extends Data_last_updateAggregateArgs> = {
        [P in keyof T & keyof AggregateData_last_update]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateData_last_update[P]>
      : GetScalarType<T[P], AggregateData_last_update[P]>
  }




  export type data_last_updateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: data_last_updateWhereInput
    orderBy?: data_last_updateOrderByWithAggregationInput | data_last_updateOrderByWithAggregationInput[]
    by: Data_last_updateScalarFieldEnum[] | Data_last_updateScalarFieldEnum
    having?: data_last_updateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Data_last_updateCountAggregateInputType | true
    _min?: Data_last_updateMinAggregateInputType
    _max?: Data_last_updateMaxAggregateInputType
  }

  export type Data_last_updateGroupByOutputType = {
    data_name: string
    last_update: Date | null
    _count: Data_last_updateCountAggregateOutputType | null
    _min: Data_last_updateMinAggregateOutputType | null
    _max: Data_last_updateMaxAggregateOutputType | null
  }

  type GetData_last_updateGroupByPayload<T extends data_last_updateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Data_last_updateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Data_last_updateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Data_last_updateGroupByOutputType[P]>
            : GetScalarType<T[P], Data_last_updateGroupByOutputType[P]>
        }
      >
    >


  export type data_last_updateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    data_name?: boolean
    last_update?: boolean
  }, ExtArgs["result"]["data_last_update"]>

  export type data_last_updateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    data_name?: boolean
    last_update?: boolean
  }, ExtArgs["result"]["data_last_update"]>

  export type data_last_updateSelectScalar = {
    data_name?: boolean
    last_update?: boolean
  }


  export type $data_last_updatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "data_last_update"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      data_name: string
      last_update: Date | null
    }, ExtArgs["result"]["data_last_update"]>
    composites: {}
  }

  type data_last_updateGetPayload<S extends boolean | null | undefined | data_last_updateDefaultArgs> = $Result.GetResult<Prisma.$data_last_updatePayload, S>

  type data_last_updateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<data_last_updateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Data_last_updateCountAggregateInputType | true
    }

  export interface data_last_updateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['data_last_update'], meta: { name: 'data_last_update' } }
    /**
     * Find zero or one Data_last_update that matches the filter.
     * @param {data_last_updateFindUniqueArgs} args - Arguments to find a Data_last_update
     * @example
     * // Get one Data_last_update
     * const data_last_update = await prisma.data_last_update.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends data_last_updateFindUniqueArgs>(args: SelectSubset<T, data_last_updateFindUniqueArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Data_last_update that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {data_last_updateFindUniqueOrThrowArgs} args - Arguments to find a Data_last_update
     * @example
     * // Get one Data_last_update
     * const data_last_update = await prisma.data_last_update.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends data_last_updateFindUniqueOrThrowArgs>(args: SelectSubset<T, data_last_updateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Data_last_update that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateFindFirstArgs} args - Arguments to find a Data_last_update
     * @example
     * // Get one Data_last_update
     * const data_last_update = await prisma.data_last_update.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends data_last_updateFindFirstArgs>(args?: SelectSubset<T, data_last_updateFindFirstArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Data_last_update that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateFindFirstOrThrowArgs} args - Arguments to find a Data_last_update
     * @example
     * // Get one Data_last_update
     * const data_last_update = await prisma.data_last_update.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends data_last_updateFindFirstOrThrowArgs>(args?: SelectSubset<T, data_last_updateFindFirstOrThrowArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Data_last_updates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Data_last_updates
     * const data_last_updates = await prisma.data_last_update.findMany()
     * 
     * // Get first 10 Data_last_updates
     * const data_last_updates = await prisma.data_last_update.findMany({ take: 10 })
     * 
     * // Only select the `data_name`
     * const data_last_updateWithData_nameOnly = await prisma.data_last_update.findMany({ select: { data_name: true } })
     * 
     */
    findMany<T extends data_last_updateFindManyArgs>(args?: SelectSubset<T, data_last_updateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Data_last_update.
     * @param {data_last_updateCreateArgs} args - Arguments to create a Data_last_update.
     * @example
     * // Create one Data_last_update
     * const Data_last_update = await prisma.data_last_update.create({
     *   data: {
     *     // ... data to create a Data_last_update
     *   }
     * })
     * 
     */
    create<T extends data_last_updateCreateArgs>(args: SelectSubset<T, data_last_updateCreateArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Data_last_updates.
     * @param {data_last_updateCreateManyArgs} args - Arguments to create many Data_last_updates.
     * @example
     * // Create many Data_last_updates
     * const data_last_update = await prisma.data_last_update.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends data_last_updateCreateManyArgs>(args?: SelectSubset<T, data_last_updateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Data_last_updates and returns the data saved in the database.
     * @param {data_last_updateCreateManyAndReturnArgs} args - Arguments to create many Data_last_updates.
     * @example
     * // Create many Data_last_updates
     * const data_last_update = await prisma.data_last_update.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Data_last_updates and only return the `data_name`
     * const data_last_updateWithData_nameOnly = await prisma.data_last_update.createManyAndReturn({ 
     *   select: { data_name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends data_last_updateCreateManyAndReturnArgs>(args?: SelectSubset<T, data_last_updateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Data_last_update.
     * @param {data_last_updateDeleteArgs} args - Arguments to delete one Data_last_update.
     * @example
     * // Delete one Data_last_update
     * const Data_last_update = await prisma.data_last_update.delete({
     *   where: {
     *     // ... filter to delete one Data_last_update
     *   }
     * })
     * 
     */
    delete<T extends data_last_updateDeleteArgs>(args: SelectSubset<T, data_last_updateDeleteArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Data_last_update.
     * @param {data_last_updateUpdateArgs} args - Arguments to update one Data_last_update.
     * @example
     * // Update one Data_last_update
     * const data_last_update = await prisma.data_last_update.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends data_last_updateUpdateArgs>(args: SelectSubset<T, data_last_updateUpdateArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Data_last_updates.
     * @param {data_last_updateDeleteManyArgs} args - Arguments to filter Data_last_updates to delete.
     * @example
     * // Delete a few Data_last_updates
     * const { count } = await prisma.data_last_update.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends data_last_updateDeleteManyArgs>(args?: SelectSubset<T, data_last_updateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Data_last_updates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Data_last_updates
     * const data_last_update = await prisma.data_last_update.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends data_last_updateUpdateManyArgs>(args: SelectSubset<T, data_last_updateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Data_last_update.
     * @param {data_last_updateUpsertArgs} args - Arguments to update or create a Data_last_update.
     * @example
     * // Update or create a Data_last_update
     * const data_last_update = await prisma.data_last_update.upsert({
     *   create: {
     *     // ... data to create a Data_last_update
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Data_last_update we want to update
     *   }
     * })
     */
    upsert<T extends data_last_updateUpsertArgs>(args: SelectSubset<T, data_last_updateUpsertArgs<ExtArgs>>): Prisma__data_last_updateClient<$Result.GetResult<Prisma.$data_last_updatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Data_last_updates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateCountArgs} args - Arguments to filter Data_last_updates to count.
     * @example
     * // Count the number of Data_last_updates
     * const count = await prisma.data_last_update.count({
     *   where: {
     *     // ... the filter for the Data_last_updates we want to count
     *   }
     * })
    **/
    count<T extends data_last_updateCountArgs>(
      args?: Subset<T, data_last_updateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Data_last_updateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Data_last_update.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Data_last_updateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Data_last_updateAggregateArgs>(args: Subset<T, Data_last_updateAggregateArgs>): Prisma.PrismaPromise<GetData_last_updateAggregateType<T>>

    /**
     * Group by Data_last_update.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_last_updateGroupByArgs} args - Group by arguments.
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
      T extends data_last_updateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: data_last_updateGroupByArgs['orderBy'] }
        : { orderBy?: data_last_updateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, data_last_updateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetData_last_updateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the data_last_update model
   */
  readonly fields: data_last_updateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for data_last_update.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__data_last_updateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the data_last_update model
   */ 
  interface data_last_updateFieldRefs {
    readonly data_name: FieldRef<"data_last_update", 'String'>
    readonly last_update: FieldRef<"data_last_update", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * data_last_update findUnique
   */
  export type data_last_updateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter, which data_last_update to fetch.
     */
    where: data_last_updateWhereUniqueInput
  }

  /**
   * data_last_update findUniqueOrThrow
   */
  export type data_last_updateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter, which data_last_update to fetch.
     */
    where: data_last_updateWhereUniqueInput
  }

  /**
   * data_last_update findFirst
   */
  export type data_last_updateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter, which data_last_update to fetch.
     */
    where?: data_last_updateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_last_updates to fetch.
     */
    orderBy?: data_last_updateOrderByWithRelationInput | data_last_updateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data_last_updates.
     */
    cursor?: data_last_updateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_last_updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_last_updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data_last_updates.
     */
    distinct?: Data_last_updateScalarFieldEnum | Data_last_updateScalarFieldEnum[]
  }

  /**
   * data_last_update findFirstOrThrow
   */
  export type data_last_updateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter, which data_last_update to fetch.
     */
    where?: data_last_updateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_last_updates to fetch.
     */
    orderBy?: data_last_updateOrderByWithRelationInput | data_last_updateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data_last_updates.
     */
    cursor?: data_last_updateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_last_updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_last_updates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data_last_updates.
     */
    distinct?: Data_last_updateScalarFieldEnum | Data_last_updateScalarFieldEnum[]
  }

  /**
   * data_last_update findMany
   */
  export type data_last_updateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter, which data_last_updates to fetch.
     */
    where?: data_last_updateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_last_updates to fetch.
     */
    orderBy?: data_last_updateOrderByWithRelationInput | data_last_updateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing data_last_updates.
     */
    cursor?: data_last_updateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_last_updates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_last_updates.
     */
    skip?: number
    distinct?: Data_last_updateScalarFieldEnum | Data_last_updateScalarFieldEnum[]
  }

  /**
   * data_last_update create
   */
  export type data_last_updateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * The data needed to create a data_last_update.
     */
    data: XOR<data_last_updateCreateInput, data_last_updateUncheckedCreateInput>
  }

  /**
   * data_last_update createMany
   */
  export type data_last_updateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many data_last_updates.
     */
    data: data_last_updateCreateManyInput | data_last_updateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * data_last_update createManyAndReturn
   */
  export type data_last_updateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many data_last_updates.
     */
    data: data_last_updateCreateManyInput | data_last_updateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * data_last_update update
   */
  export type data_last_updateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * The data needed to update a data_last_update.
     */
    data: XOR<data_last_updateUpdateInput, data_last_updateUncheckedUpdateInput>
    /**
     * Choose, which data_last_update to update.
     */
    where: data_last_updateWhereUniqueInput
  }

  /**
   * data_last_update updateMany
   */
  export type data_last_updateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update data_last_updates.
     */
    data: XOR<data_last_updateUpdateManyMutationInput, data_last_updateUncheckedUpdateManyInput>
    /**
     * Filter which data_last_updates to update
     */
    where?: data_last_updateWhereInput
  }

  /**
   * data_last_update upsert
   */
  export type data_last_updateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * The filter to search for the data_last_update to update in case it exists.
     */
    where: data_last_updateWhereUniqueInput
    /**
     * In case the data_last_update found by the `where` argument doesn't exist, create a new data_last_update with this data.
     */
    create: XOR<data_last_updateCreateInput, data_last_updateUncheckedCreateInput>
    /**
     * In case the data_last_update was found with the provided `where` argument, update it with this data.
     */
    update: XOR<data_last_updateUpdateInput, data_last_updateUncheckedUpdateInput>
  }

  /**
   * data_last_update delete
   */
  export type data_last_updateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
    /**
     * Filter which data_last_update to delete.
     */
    where: data_last_updateWhereUniqueInput
  }

  /**
   * data_last_update deleteMany
   */
  export type data_last_updateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data_last_updates to delete
     */
    where?: data_last_updateWhereInput
  }

  /**
   * data_last_update without action
   */
  export type data_last_updateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_last_update
     */
    select?: data_last_updateSelect<ExtArgs> | null
  }


  /**
   * Model ebit_growth
   */

  export type AggregateEbit_growth = {
    _count: Ebit_growthCountAggregateOutputType | null
    _min: Ebit_growthMinAggregateOutputType | null
    _max: Ebit_growthMaxAggregateOutputType | null
  }

  export type Ebit_growthMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    roc: string | null
    reinvestment_rate: string | null
    expected_growth_ebit: string | null
  }

  export type Ebit_growthMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    roc: string | null
    reinvestment_rate: string | null
    expected_growth_ebit: string | null
  }

  export type Ebit_growthCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    roc: number
    reinvestment_rate: number
    expected_growth_ebit: number
    _all: number
  }


  export type Ebit_growthMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    roc?: true
    reinvestment_rate?: true
    expected_growth_ebit?: true
  }

  export type Ebit_growthMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    roc?: true
    reinvestment_rate?: true
    expected_growth_ebit?: true
  }

  export type Ebit_growthCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    roc?: true
    reinvestment_rate?: true
    expected_growth_ebit?: true
    _all?: true
  }

  export type Ebit_growthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ebit_growth to aggregate.
     */
    where?: ebit_growthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ebit_growths to fetch.
     */
    orderBy?: ebit_growthOrderByWithRelationInput | ebit_growthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ebit_growthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ebit_growths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ebit_growths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ebit_growths
    **/
    _count?: true | Ebit_growthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ebit_growthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ebit_growthMaxAggregateInputType
  }

  export type GetEbit_growthAggregateType<T extends Ebit_growthAggregateArgs> = {
        [P in keyof T & keyof AggregateEbit_growth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEbit_growth[P]>
      : GetScalarType<T[P], AggregateEbit_growth[P]>
  }




  export type ebit_growthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ebit_growthWhereInput
    orderBy?: ebit_growthOrderByWithAggregationInput | ebit_growthOrderByWithAggregationInput[]
    by: Ebit_growthScalarFieldEnum[] | Ebit_growthScalarFieldEnum
    having?: ebit_growthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ebit_growthCountAggregateInputType | true
    _min?: Ebit_growthMinAggregateInputType
    _max?: Ebit_growthMaxAggregateInputType
  }

  export type Ebit_growthGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    roc: string | null
    reinvestment_rate: string | null
    expected_growth_ebit: string | null
    _count: Ebit_growthCountAggregateOutputType | null
    _min: Ebit_growthMinAggregateOutputType | null
    _max: Ebit_growthMaxAggregateOutputType | null
  }

  type GetEbit_growthGroupByPayload<T extends ebit_growthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ebit_growthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ebit_growthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ebit_growthGroupByOutputType[P]>
            : GetScalarType<T[P], Ebit_growthGroupByOutputType[P]>
        }
      >
    >


  export type ebit_growthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    roc?: boolean
    reinvestment_rate?: boolean
    expected_growth_ebit?: boolean
  }, ExtArgs["result"]["ebit_growth"]>

  export type ebit_growthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    roc?: boolean
    reinvestment_rate?: boolean
    expected_growth_ebit?: boolean
  }, ExtArgs["result"]["ebit_growth"]>

  export type ebit_growthSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    roc?: boolean
    reinvestment_rate?: boolean
    expected_growth_ebit?: boolean
  }


  export type $ebit_growthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ebit_growth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      roc: string | null
      reinvestment_rate: string | null
      expected_growth_ebit: string | null
    }, ExtArgs["result"]["ebit_growth"]>
    composites: {}
  }

  type ebit_growthGetPayload<S extends boolean | null | undefined | ebit_growthDefaultArgs> = $Result.GetResult<Prisma.$ebit_growthPayload, S>

  type ebit_growthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ebit_growthFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Ebit_growthCountAggregateInputType | true
    }

  export interface ebit_growthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ebit_growth'], meta: { name: 'ebit_growth' } }
    /**
     * Find zero or one Ebit_growth that matches the filter.
     * @param {ebit_growthFindUniqueArgs} args - Arguments to find a Ebit_growth
     * @example
     * // Get one Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ebit_growthFindUniqueArgs>(args: SelectSubset<T, ebit_growthFindUniqueArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Ebit_growth that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ebit_growthFindUniqueOrThrowArgs} args - Arguments to find a Ebit_growth
     * @example
     * // Get one Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ebit_growthFindUniqueOrThrowArgs>(args: SelectSubset<T, ebit_growthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Ebit_growth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthFindFirstArgs} args - Arguments to find a Ebit_growth
     * @example
     * // Get one Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ebit_growthFindFirstArgs>(args?: SelectSubset<T, ebit_growthFindFirstArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Ebit_growth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthFindFirstOrThrowArgs} args - Arguments to find a Ebit_growth
     * @example
     * // Get one Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ebit_growthFindFirstOrThrowArgs>(args?: SelectSubset<T, ebit_growthFindFirstOrThrowArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Ebit_growths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ebit_growths
     * const ebit_growths = await prisma.ebit_growth.findMany()
     * 
     * // Get first 10 Ebit_growths
     * const ebit_growths = await prisma.ebit_growth.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const ebit_growthWithIndustryOnly = await prisma.ebit_growth.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends ebit_growthFindManyArgs>(args?: SelectSubset<T, ebit_growthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Ebit_growth.
     * @param {ebit_growthCreateArgs} args - Arguments to create a Ebit_growth.
     * @example
     * // Create one Ebit_growth
     * const Ebit_growth = await prisma.ebit_growth.create({
     *   data: {
     *     // ... data to create a Ebit_growth
     *   }
     * })
     * 
     */
    create<T extends ebit_growthCreateArgs>(args: SelectSubset<T, ebit_growthCreateArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Ebit_growths.
     * @param {ebit_growthCreateManyArgs} args - Arguments to create many Ebit_growths.
     * @example
     * // Create many Ebit_growths
     * const ebit_growth = await prisma.ebit_growth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ebit_growthCreateManyArgs>(args?: SelectSubset<T, ebit_growthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ebit_growths and returns the data saved in the database.
     * @param {ebit_growthCreateManyAndReturnArgs} args - Arguments to create many Ebit_growths.
     * @example
     * // Create many Ebit_growths
     * const ebit_growth = await prisma.ebit_growth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ebit_growths and only return the `industry`
     * const ebit_growthWithIndustryOnly = await prisma.ebit_growth.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ebit_growthCreateManyAndReturnArgs>(args?: SelectSubset<T, ebit_growthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Ebit_growth.
     * @param {ebit_growthDeleteArgs} args - Arguments to delete one Ebit_growth.
     * @example
     * // Delete one Ebit_growth
     * const Ebit_growth = await prisma.ebit_growth.delete({
     *   where: {
     *     // ... filter to delete one Ebit_growth
     *   }
     * })
     * 
     */
    delete<T extends ebit_growthDeleteArgs>(args: SelectSubset<T, ebit_growthDeleteArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Ebit_growth.
     * @param {ebit_growthUpdateArgs} args - Arguments to update one Ebit_growth.
     * @example
     * // Update one Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ebit_growthUpdateArgs>(args: SelectSubset<T, ebit_growthUpdateArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Ebit_growths.
     * @param {ebit_growthDeleteManyArgs} args - Arguments to filter Ebit_growths to delete.
     * @example
     * // Delete a few Ebit_growths
     * const { count } = await prisma.ebit_growth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ebit_growthDeleteManyArgs>(args?: SelectSubset<T, ebit_growthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ebit_growths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ebit_growths
     * const ebit_growth = await prisma.ebit_growth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ebit_growthUpdateManyArgs>(args: SelectSubset<T, ebit_growthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ebit_growth.
     * @param {ebit_growthUpsertArgs} args - Arguments to update or create a Ebit_growth.
     * @example
     * // Update or create a Ebit_growth
     * const ebit_growth = await prisma.ebit_growth.upsert({
     *   create: {
     *     // ... data to create a Ebit_growth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ebit_growth we want to update
     *   }
     * })
     */
    upsert<T extends ebit_growthUpsertArgs>(args: SelectSubset<T, ebit_growthUpsertArgs<ExtArgs>>): Prisma__ebit_growthClient<$Result.GetResult<Prisma.$ebit_growthPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Ebit_growths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthCountArgs} args - Arguments to filter Ebit_growths to count.
     * @example
     * // Count the number of Ebit_growths
     * const count = await prisma.ebit_growth.count({
     *   where: {
     *     // ... the filter for the Ebit_growths we want to count
     *   }
     * })
    **/
    count<T extends ebit_growthCountArgs>(
      args?: Subset<T, ebit_growthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ebit_growthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ebit_growth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ebit_growthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Ebit_growthAggregateArgs>(args: Subset<T, Ebit_growthAggregateArgs>): Prisma.PrismaPromise<GetEbit_growthAggregateType<T>>

    /**
     * Group by Ebit_growth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ebit_growthGroupByArgs} args - Group by arguments.
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
      T extends ebit_growthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ebit_growthGroupByArgs['orderBy'] }
        : { orderBy?: ebit_growthGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ebit_growthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEbit_growthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ebit_growth model
   */
  readonly fields: ebit_growthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ebit_growth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ebit_growthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ebit_growth model
   */ 
  interface ebit_growthFieldRefs {
    readonly industry: FieldRef<"ebit_growth", 'String'>
    readonly no_of_firms: FieldRef<"ebit_growth", 'String'>
    readonly roc: FieldRef<"ebit_growth", 'String'>
    readonly reinvestment_rate: FieldRef<"ebit_growth", 'String'>
    readonly expected_growth_ebit: FieldRef<"ebit_growth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ebit_growth findUnique
   */
  export type ebit_growthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter, which ebit_growth to fetch.
     */
    where: ebit_growthWhereUniqueInput
  }

  /**
   * ebit_growth findUniqueOrThrow
   */
  export type ebit_growthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter, which ebit_growth to fetch.
     */
    where: ebit_growthWhereUniqueInput
  }

  /**
   * ebit_growth findFirst
   */
  export type ebit_growthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter, which ebit_growth to fetch.
     */
    where?: ebit_growthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ebit_growths to fetch.
     */
    orderBy?: ebit_growthOrderByWithRelationInput | ebit_growthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ebit_growths.
     */
    cursor?: ebit_growthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ebit_growths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ebit_growths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ebit_growths.
     */
    distinct?: Ebit_growthScalarFieldEnum | Ebit_growthScalarFieldEnum[]
  }

  /**
   * ebit_growth findFirstOrThrow
   */
  export type ebit_growthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter, which ebit_growth to fetch.
     */
    where?: ebit_growthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ebit_growths to fetch.
     */
    orderBy?: ebit_growthOrderByWithRelationInput | ebit_growthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ebit_growths.
     */
    cursor?: ebit_growthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ebit_growths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ebit_growths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ebit_growths.
     */
    distinct?: Ebit_growthScalarFieldEnum | Ebit_growthScalarFieldEnum[]
  }

  /**
   * ebit_growth findMany
   */
  export type ebit_growthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter, which ebit_growths to fetch.
     */
    where?: ebit_growthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ebit_growths to fetch.
     */
    orderBy?: ebit_growthOrderByWithRelationInput | ebit_growthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ebit_growths.
     */
    cursor?: ebit_growthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ebit_growths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ebit_growths.
     */
    skip?: number
    distinct?: Ebit_growthScalarFieldEnum | Ebit_growthScalarFieldEnum[]
  }

  /**
   * ebit_growth create
   */
  export type ebit_growthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * The data needed to create a ebit_growth.
     */
    data: XOR<ebit_growthCreateInput, ebit_growthUncheckedCreateInput>
  }

  /**
   * ebit_growth createMany
   */
  export type ebit_growthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ebit_growths.
     */
    data: ebit_growthCreateManyInput | ebit_growthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ebit_growth createManyAndReturn
   */
  export type ebit_growthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ebit_growths.
     */
    data: ebit_growthCreateManyInput | ebit_growthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ebit_growth update
   */
  export type ebit_growthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * The data needed to update a ebit_growth.
     */
    data: XOR<ebit_growthUpdateInput, ebit_growthUncheckedUpdateInput>
    /**
     * Choose, which ebit_growth to update.
     */
    where: ebit_growthWhereUniqueInput
  }

  /**
   * ebit_growth updateMany
   */
  export type ebit_growthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ebit_growths.
     */
    data: XOR<ebit_growthUpdateManyMutationInput, ebit_growthUncheckedUpdateManyInput>
    /**
     * Filter which ebit_growths to update
     */
    where?: ebit_growthWhereInput
  }

  /**
   * ebit_growth upsert
   */
  export type ebit_growthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * The filter to search for the ebit_growth to update in case it exists.
     */
    where: ebit_growthWhereUniqueInput
    /**
     * In case the ebit_growth found by the `where` argument doesn't exist, create a new ebit_growth with this data.
     */
    create: XOR<ebit_growthCreateInput, ebit_growthUncheckedCreateInput>
    /**
     * In case the ebit_growth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ebit_growthUpdateInput, ebit_growthUncheckedUpdateInput>
  }

  /**
   * ebit_growth delete
   */
  export type ebit_growthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
    /**
     * Filter which ebit_growth to delete.
     */
    where: ebit_growthWhereUniqueInput
  }

  /**
   * ebit_growth deleteMany
   */
  export type ebit_growthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ebit_growths to delete
     */
    where?: ebit_growthWhereInput
  }

  /**
   * ebit_growth without action
   */
  export type ebit_growthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ebit_growth
     */
    select?: ebit_growthSelect<ExtArgs> | null
  }


  /**
   * Model pe_ratio_us
   */

  export type AggregatePe_ratio_us = {
    _count: Pe_ratio_usCountAggregateOutputType | null
    _min: Pe_ratio_usMinAggregateOutputType | null
    _max: Pe_ratio_usMaxAggregateOutputType | null
  }

  export type Pe_ratio_usMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    perc_money_losing_firms_trailing: string | null
    current_pe: string | null
    trailing_pe: string | null
    forward_pe: string | null
    agg_mkt_cap_net_income: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms: string | null
    expected_growth_next_5_yrs: string | null
    peg_ratio: string | null
  }

  export type Pe_ratio_usMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    perc_money_losing_firms_trailing: string | null
    current_pe: string | null
    trailing_pe: string | null
    forward_pe: string | null
    agg_mkt_cap_net_income: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms: string | null
    expected_growth_next_5_yrs: string | null
    peg_ratio: string | null
  }

  export type Pe_ratio_usCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    perc_money_losing_firms_trailing: number
    current_pe: number
    trailing_pe: number
    forward_pe: number
    agg_mkt_cap_net_income: number
    agg_mkt_cap_trailing_net_income_money_making_firms: number
    expected_growth_next_5_yrs: number
    peg_ratio: number
    _all: number
  }


  export type Pe_ratio_usMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    perc_money_losing_firms_trailing?: true
    current_pe?: true
    trailing_pe?: true
    forward_pe?: true
    agg_mkt_cap_net_income?: true
    agg_mkt_cap_trailing_net_income_money_making_firms?: true
    expected_growth_next_5_yrs?: true
    peg_ratio?: true
  }

  export type Pe_ratio_usMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    perc_money_losing_firms_trailing?: true
    current_pe?: true
    trailing_pe?: true
    forward_pe?: true
    agg_mkt_cap_net_income?: true
    agg_mkt_cap_trailing_net_income_money_making_firms?: true
    expected_growth_next_5_yrs?: true
    peg_ratio?: true
  }

  export type Pe_ratio_usCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    perc_money_losing_firms_trailing?: true
    current_pe?: true
    trailing_pe?: true
    forward_pe?: true
    agg_mkt_cap_net_income?: true
    agg_mkt_cap_trailing_net_income_money_making_firms?: true
    expected_growth_next_5_yrs?: true
    peg_ratio?: true
    _all?: true
  }

  export type Pe_ratio_usAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pe_ratio_us to aggregate.
     */
    where?: pe_ratio_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pe_ratio_uses to fetch.
     */
    orderBy?: pe_ratio_usOrderByWithRelationInput | pe_ratio_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pe_ratio_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pe_ratio_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pe_ratio_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pe_ratio_uses
    **/
    _count?: true | Pe_ratio_usCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pe_ratio_usMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pe_ratio_usMaxAggregateInputType
  }

  export type GetPe_ratio_usAggregateType<T extends Pe_ratio_usAggregateArgs> = {
        [P in keyof T & keyof AggregatePe_ratio_us]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePe_ratio_us[P]>
      : GetScalarType<T[P], AggregatePe_ratio_us[P]>
  }




  export type pe_ratio_usGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pe_ratio_usWhereInput
    orderBy?: pe_ratio_usOrderByWithAggregationInput | pe_ratio_usOrderByWithAggregationInput[]
    by: Pe_ratio_usScalarFieldEnum[] | Pe_ratio_usScalarFieldEnum
    having?: pe_ratio_usScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pe_ratio_usCountAggregateInputType | true
    _min?: Pe_ratio_usMinAggregateInputType
    _max?: Pe_ratio_usMaxAggregateInputType
  }

  export type Pe_ratio_usGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    perc_money_losing_firms_trailing: string | null
    current_pe: string | null
    trailing_pe: string | null
    forward_pe: string | null
    agg_mkt_cap_net_income: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms: string | null
    expected_growth_next_5_yrs: string | null
    peg_ratio: string | null
    _count: Pe_ratio_usCountAggregateOutputType | null
    _min: Pe_ratio_usMinAggregateOutputType | null
    _max: Pe_ratio_usMaxAggregateOutputType | null
  }

  type GetPe_ratio_usGroupByPayload<T extends pe_ratio_usGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pe_ratio_usGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pe_ratio_usGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pe_ratio_usGroupByOutputType[P]>
            : GetScalarType<T[P], Pe_ratio_usGroupByOutputType[P]>
        }
      >
    >


  export type pe_ratio_usSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    perc_money_losing_firms_trailing?: boolean
    current_pe?: boolean
    trailing_pe?: boolean
    forward_pe?: boolean
    agg_mkt_cap_net_income?: boolean
    agg_mkt_cap_trailing_net_income_money_making_firms?: boolean
    expected_growth_next_5_yrs?: boolean
    peg_ratio?: boolean
  }, ExtArgs["result"]["pe_ratio_us"]>

  export type pe_ratio_usSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    perc_money_losing_firms_trailing?: boolean
    current_pe?: boolean
    trailing_pe?: boolean
    forward_pe?: boolean
    agg_mkt_cap_net_income?: boolean
    agg_mkt_cap_trailing_net_income_money_making_firms?: boolean
    expected_growth_next_5_yrs?: boolean
    peg_ratio?: boolean
  }, ExtArgs["result"]["pe_ratio_us"]>

  export type pe_ratio_usSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    perc_money_losing_firms_trailing?: boolean
    current_pe?: boolean
    trailing_pe?: boolean
    forward_pe?: boolean
    agg_mkt_cap_net_income?: boolean
    agg_mkt_cap_trailing_net_income_money_making_firms?: boolean
    expected_growth_next_5_yrs?: boolean
    peg_ratio?: boolean
  }


  export type $pe_ratio_usPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pe_ratio_us"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      perc_money_losing_firms_trailing: string | null
      current_pe: string | null
      trailing_pe: string | null
      forward_pe: string | null
      agg_mkt_cap_net_income: string | null
      agg_mkt_cap_trailing_net_income_money_making_firms: string | null
      expected_growth_next_5_yrs: string | null
      peg_ratio: string | null
    }, ExtArgs["result"]["pe_ratio_us"]>
    composites: {}
  }

  type pe_ratio_usGetPayload<S extends boolean | null | undefined | pe_ratio_usDefaultArgs> = $Result.GetResult<Prisma.$pe_ratio_usPayload, S>

  type pe_ratio_usCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<pe_ratio_usFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Pe_ratio_usCountAggregateInputType | true
    }

  export interface pe_ratio_usDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pe_ratio_us'], meta: { name: 'pe_ratio_us' } }
    /**
     * Find zero or one Pe_ratio_us that matches the filter.
     * @param {pe_ratio_usFindUniqueArgs} args - Arguments to find a Pe_ratio_us
     * @example
     * // Get one Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pe_ratio_usFindUniqueArgs>(args: SelectSubset<T, pe_ratio_usFindUniqueArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pe_ratio_us that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {pe_ratio_usFindUniqueOrThrowArgs} args - Arguments to find a Pe_ratio_us
     * @example
     * // Get one Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pe_ratio_usFindUniqueOrThrowArgs>(args: SelectSubset<T, pe_ratio_usFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pe_ratio_us that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usFindFirstArgs} args - Arguments to find a Pe_ratio_us
     * @example
     * // Get one Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pe_ratio_usFindFirstArgs>(args?: SelectSubset<T, pe_ratio_usFindFirstArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pe_ratio_us that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usFindFirstOrThrowArgs} args - Arguments to find a Pe_ratio_us
     * @example
     * // Get one Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pe_ratio_usFindFirstOrThrowArgs>(args?: SelectSubset<T, pe_ratio_usFindFirstOrThrowArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pe_ratio_uses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pe_ratio_uses
     * const pe_ratio_uses = await prisma.pe_ratio_us.findMany()
     * 
     * // Get first 10 Pe_ratio_uses
     * const pe_ratio_uses = await prisma.pe_ratio_us.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const pe_ratio_usWithIndustryOnly = await prisma.pe_ratio_us.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends pe_ratio_usFindManyArgs>(args?: SelectSubset<T, pe_ratio_usFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pe_ratio_us.
     * @param {pe_ratio_usCreateArgs} args - Arguments to create a Pe_ratio_us.
     * @example
     * // Create one Pe_ratio_us
     * const Pe_ratio_us = await prisma.pe_ratio_us.create({
     *   data: {
     *     // ... data to create a Pe_ratio_us
     *   }
     * })
     * 
     */
    create<T extends pe_ratio_usCreateArgs>(args: SelectSubset<T, pe_ratio_usCreateArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pe_ratio_uses.
     * @param {pe_ratio_usCreateManyArgs} args - Arguments to create many Pe_ratio_uses.
     * @example
     * // Create many Pe_ratio_uses
     * const pe_ratio_us = await prisma.pe_ratio_us.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pe_ratio_usCreateManyArgs>(args?: SelectSubset<T, pe_ratio_usCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pe_ratio_uses and returns the data saved in the database.
     * @param {pe_ratio_usCreateManyAndReturnArgs} args - Arguments to create many Pe_ratio_uses.
     * @example
     * // Create many Pe_ratio_uses
     * const pe_ratio_us = await prisma.pe_ratio_us.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pe_ratio_uses and only return the `industry`
     * const pe_ratio_usWithIndustryOnly = await prisma.pe_ratio_us.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pe_ratio_usCreateManyAndReturnArgs>(args?: SelectSubset<T, pe_ratio_usCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pe_ratio_us.
     * @param {pe_ratio_usDeleteArgs} args - Arguments to delete one Pe_ratio_us.
     * @example
     * // Delete one Pe_ratio_us
     * const Pe_ratio_us = await prisma.pe_ratio_us.delete({
     *   where: {
     *     // ... filter to delete one Pe_ratio_us
     *   }
     * })
     * 
     */
    delete<T extends pe_ratio_usDeleteArgs>(args: SelectSubset<T, pe_ratio_usDeleteArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pe_ratio_us.
     * @param {pe_ratio_usUpdateArgs} args - Arguments to update one Pe_ratio_us.
     * @example
     * // Update one Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pe_ratio_usUpdateArgs>(args: SelectSubset<T, pe_ratio_usUpdateArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pe_ratio_uses.
     * @param {pe_ratio_usDeleteManyArgs} args - Arguments to filter Pe_ratio_uses to delete.
     * @example
     * // Delete a few Pe_ratio_uses
     * const { count } = await prisma.pe_ratio_us.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pe_ratio_usDeleteManyArgs>(args?: SelectSubset<T, pe_ratio_usDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pe_ratio_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pe_ratio_uses
     * const pe_ratio_us = await prisma.pe_ratio_us.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pe_ratio_usUpdateManyArgs>(args: SelectSubset<T, pe_ratio_usUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pe_ratio_us.
     * @param {pe_ratio_usUpsertArgs} args - Arguments to update or create a Pe_ratio_us.
     * @example
     * // Update or create a Pe_ratio_us
     * const pe_ratio_us = await prisma.pe_ratio_us.upsert({
     *   create: {
     *     // ... data to create a Pe_ratio_us
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pe_ratio_us we want to update
     *   }
     * })
     */
    upsert<T extends pe_ratio_usUpsertArgs>(args: SelectSubset<T, pe_ratio_usUpsertArgs<ExtArgs>>): Prisma__pe_ratio_usClient<$Result.GetResult<Prisma.$pe_ratio_usPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pe_ratio_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usCountArgs} args - Arguments to filter Pe_ratio_uses to count.
     * @example
     * // Count the number of Pe_ratio_uses
     * const count = await prisma.pe_ratio_us.count({
     *   where: {
     *     // ... the filter for the Pe_ratio_uses we want to count
     *   }
     * })
    **/
    count<T extends pe_ratio_usCountArgs>(
      args?: Subset<T, pe_ratio_usCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pe_ratio_usCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pe_ratio_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pe_ratio_usAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Pe_ratio_usAggregateArgs>(args: Subset<T, Pe_ratio_usAggregateArgs>): Prisma.PrismaPromise<GetPe_ratio_usAggregateType<T>>

    /**
     * Group by Pe_ratio_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pe_ratio_usGroupByArgs} args - Group by arguments.
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
      T extends pe_ratio_usGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pe_ratio_usGroupByArgs['orderBy'] }
        : { orderBy?: pe_ratio_usGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, pe_ratio_usGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPe_ratio_usGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pe_ratio_us model
   */
  readonly fields: pe_ratio_usFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pe_ratio_us.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pe_ratio_usClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the pe_ratio_us model
   */ 
  interface pe_ratio_usFieldRefs {
    readonly industry: FieldRef<"pe_ratio_us", 'String'>
    readonly no_of_firms: FieldRef<"pe_ratio_us", 'String'>
    readonly perc_money_losing_firms_trailing: FieldRef<"pe_ratio_us", 'String'>
    readonly current_pe: FieldRef<"pe_ratio_us", 'String'>
    readonly trailing_pe: FieldRef<"pe_ratio_us", 'String'>
    readonly forward_pe: FieldRef<"pe_ratio_us", 'String'>
    readonly agg_mkt_cap_net_income: FieldRef<"pe_ratio_us", 'String'>
    readonly agg_mkt_cap_trailing_net_income_money_making_firms: FieldRef<"pe_ratio_us", 'String'>
    readonly expected_growth_next_5_yrs: FieldRef<"pe_ratio_us", 'String'>
    readonly peg_ratio: FieldRef<"pe_ratio_us", 'String'>
  }
    

  // Custom InputTypes
  /**
   * pe_ratio_us findUnique
   */
  export type pe_ratio_usFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter, which pe_ratio_us to fetch.
     */
    where: pe_ratio_usWhereUniqueInput
  }

  /**
   * pe_ratio_us findUniqueOrThrow
   */
  export type pe_ratio_usFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter, which pe_ratio_us to fetch.
     */
    where: pe_ratio_usWhereUniqueInput
  }

  /**
   * pe_ratio_us findFirst
   */
  export type pe_ratio_usFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter, which pe_ratio_us to fetch.
     */
    where?: pe_ratio_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pe_ratio_uses to fetch.
     */
    orderBy?: pe_ratio_usOrderByWithRelationInput | pe_ratio_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pe_ratio_uses.
     */
    cursor?: pe_ratio_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pe_ratio_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pe_ratio_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pe_ratio_uses.
     */
    distinct?: Pe_ratio_usScalarFieldEnum | Pe_ratio_usScalarFieldEnum[]
  }

  /**
   * pe_ratio_us findFirstOrThrow
   */
  export type pe_ratio_usFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter, which pe_ratio_us to fetch.
     */
    where?: pe_ratio_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pe_ratio_uses to fetch.
     */
    orderBy?: pe_ratio_usOrderByWithRelationInput | pe_ratio_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pe_ratio_uses.
     */
    cursor?: pe_ratio_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pe_ratio_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pe_ratio_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pe_ratio_uses.
     */
    distinct?: Pe_ratio_usScalarFieldEnum | Pe_ratio_usScalarFieldEnum[]
  }

  /**
   * pe_ratio_us findMany
   */
  export type pe_ratio_usFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter, which pe_ratio_uses to fetch.
     */
    where?: pe_ratio_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pe_ratio_uses to fetch.
     */
    orderBy?: pe_ratio_usOrderByWithRelationInput | pe_ratio_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pe_ratio_uses.
     */
    cursor?: pe_ratio_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pe_ratio_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pe_ratio_uses.
     */
    skip?: number
    distinct?: Pe_ratio_usScalarFieldEnum | Pe_ratio_usScalarFieldEnum[]
  }

  /**
   * pe_ratio_us create
   */
  export type pe_ratio_usCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * The data needed to create a pe_ratio_us.
     */
    data: XOR<pe_ratio_usCreateInput, pe_ratio_usUncheckedCreateInput>
  }

  /**
   * pe_ratio_us createMany
   */
  export type pe_ratio_usCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pe_ratio_uses.
     */
    data: pe_ratio_usCreateManyInput | pe_ratio_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pe_ratio_us createManyAndReturn
   */
  export type pe_ratio_usCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many pe_ratio_uses.
     */
    data: pe_ratio_usCreateManyInput | pe_ratio_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pe_ratio_us update
   */
  export type pe_ratio_usUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * The data needed to update a pe_ratio_us.
     */
    data: XOR<pe_ratio_usUpdateInput, pe_ratio_usUncheckedUpdateInput>
    /**
     * Choose, which pe_ratio_us to update.
     */
    where: pe_ratio_usWhereUniqueInput
  }

  /**
   * pe_ratio_us updateMany
   */
  export type pe_ratio_usUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pe_ratio_uses.
     */
    data: XOR<pe_ratio_usUpdateManyMutationInput, pe_ratio_usUncheckedUpdateManyInput>
    /**
     * Filter which pe_ratio_uses to update
     */
    where?: pe_ratio_usWhereInput
  }

  /**
   * pe_ratio_us upsert
   */
  export type pe_ratio_usUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * The filter to search for the pe_ratio_us to update in case it exists.
     */
    where: pe_ratio_usWhereUniqueInput
    /**
     * In case the pe_ratio_us found by the `where` argument doesn't exist, create a new pe_ratio_us with this data.
     */
    create: XOR<pe_ratio_usCreateInput, pe_ratio_usUncheckedCreateInput>
    /**
     * In case the pe_ratio_us was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pe_ratio_usUpdateInput, pe_ratio_usUncheckedUpdateInput>
  }

  /**
   * pe_ratio_us delete
   */
  export type pe_ratio_usDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
    /**
     * Filter which pe_ratio_us to delete.
     */
    where: pe_ratio_usWhereUniqueInput
  }

  /**
   * pe_ratio_us deleteMany
   */
  export type pe_ratio_usDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pe_ratio_uses to delete
     */
    where?: pe_ratio_usWhereInput
  }

  /**
   * pe_ratio_us without action
   */
  export type pe_ratio_usDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pe_ratio_us
     */
    select?: pe_ratio_usSelect<ExtArgs> | null
  }


  /**
   * Model rev_growth_rate
   */

  export type AggregateRev_growth_rate = {
    _count: Rev_growth_rateCountAggregateOutputType | null
    _min: Rev_growth_rateMinAggregateOutputType | null
    _max: Rev_growth_rateMaxAggregateOutputType | null
  }

  export type Rev_growth_rateMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    cagr_net_income_last_5_years: string | null
    cagr_net_rev_last_5_years: string | null
    expected_growth_rev_next_2_years: string | null
    expected_growth_rev_next_5_years: string | null
    expected_growth_eps_next_5_years: string | null
  }

  export type Rev_growth_rateMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    cagr_net_income_last_5_years: string | null
    cagr_net_rev_last_5_years: string | null
    expected_growth_rev_next_2_years: string | null
    expected_growth_rev_next_5_years: string | null
    expected_growth_eps_next_5_years: string | null
  }

  export type Rev_growth_rateCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    cagr_net_income_last_5_years: number
    cagr_net_rev_last_5_years: number
    expected_growth_rev_next_2_years: number
    expected_growth_rev_next_5_years: number
    expected_growth_eps_next_5_years: number
    _all: number
  }


  export type Rev_growth_rateMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    cagr_net_income_last_5_years?: true
    cagr_net_rev_last_5_years?: true
    expected_growth_rev_next_2_years?: true
    expected_growth_rev_next_5_years?: true
    expected_growth_eps_next_5_years?: true
  }

  export type Rev_growth_rateMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    cagr_net_income_last_5_years?: true
    cagr_net_rev_last_5_years?: true
    expected_growth_rev_next_2_years?: true
    expected_growth_rev_next_5_years?: true
    expected_growth_eps_next_5_years?: true
  }

  export type Rev_growth_rateCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    cagr_net_income_last_5_years?: true
    cagr_net_rev_last_5_years?: true
    expected_growth_rev_next_2_years?: true
    expected_growth_rev_next_5_years?: true
    expected_growth_eps_next_5_years?: true
    _all?: true
  }

  export type Rev_growth_rateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rev_growth_rate to aggregate.
     */
    where?: rev_growth_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rev_growth_rates to fetch.
     */
    orderBy?: rev_growth_rateOrderByWithRelationInput | rev_growth_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rev_growth_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rev_growth_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rev_growth_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rev_growth_rates
    **/
    _count?: true | Rev_growth_rateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Rev_growth_rateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Rev_growth_rateMaxAggregateInputType
  }

  export type GetRev_growth_rateAggregateType<T extends Rev_growth_rateAggregateArgs> = {
        [P in keyof T & keyof AggregateRev_growth_rate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRev_growth_rate[P]>
      : GetScalarType<T[P], AggregateRev_growth_rate[P]>
  }




  export type rev_growth_rateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rev_growth_rateWhereInput
    orderBy?: rev_growth_rateOrderByWithAggregationInput | rev_growth_rateOrderByWithAggregationInput[]
    by: Rev_growth_rateScalarFieldEnum[] | Rev_growth_rateScalarFieldEnum
    having?: rev_growth_rateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Rev_growth_rateCountAggregateInputType | true
    _min?: Rev_growth_rateMinAggregateInputType
    _max?: Rev_growth_rateMaxAggregateInputType
  }

  export type Rev_growth_rateGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    cagr_net_income_last_5_years: string | null
    cagr_net_rev_last_5_years: string | null
    expected_growth_rev_next_2_years: string | null
    expected_growth_rev_next_5_years: string | null
    expected_growth_eps_next_5_years: string | null
    _count: Rev_growth_rateCountAggregateOutputType | null
    _min: Rev_growth_rateMinAggregateOutputType | null
    _max: Rev_growth_rateMaxAggregateOutputType | null
  }

  type GetRev_growth_rateGroupByPayload<T extends rev_growth_rateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Rev_growth_rateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Rev_growth_rateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Rev_growth_rateGroupByOutputType[P]>
            : GetScalarType<T[P], Rev_growth_rateGroupByOutputType[P]>
        }
      >
    >


  export type rev_growth_rateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    cagr_net_income_last_5_years?: boolean
    cagr_net_rev_last_5_years?: boolean
    expected_growth_rev_next_2_years?: boolean
    expected_growth_rev_next_5_years?: boolean
    expected_growth_eps_next_5_years?: boolean
  }, ExtArgs["result"]["rev_growth_rate"]>

  export type rev_growth_rateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    cagr_net_income_last_5_years?: boolean
    cagr_net_rev_last_5_years?: boolean
    expected_growth_rev_next_2_years?: boolean
    expected_growth_rev_next_5_years?: boolean
    expected_growth_eps_next_5_years?: boolean
  }, ExtArgs["result"]["rev_growth_rate"]>

  export type rev_growth_rateSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    cagr_net_income_last_5_years?: boolean
    cagr_net_rev_last_5_years?: boolean
    expected_growth_rev_next_2_years?: boolean
    expected_growth_rev_next_5_years?: boolean
    expected_growth_eps_next_5_years?: boolean
  }


  export type $rev_growth_ratePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rev_growth_rate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      cagr_net_income_last_5_years: string | null
      cagr_net_rev_last_5_years: string | null
      expected_growth_rev_next_2_years: string | null
      expected_growth_rev_next_5_years: string | null
      expected_growth_eps_next_5_years: string | null
    }, ExtArgs["result"]["rev_growth_rate"]>
    composites: {}
  }

  type rev_growth_rateGetPayload<S extends boolean | null | undefined | rev_growth_rateDefaultArgs> = $Result.GetResult<Prisma.$rev_growth_ratePayload, S>

  type rev_growth_rateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<rev_growth_rateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Rev_growth_rateCountAggregateInputType | true
    }

  export interface rev_growth_rateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rev_growth_rate'], meta: { name: 'rev_growth_rate' } }
    /**
     * Find zero or one Rev_growth_rate that matches the filter.
     * @param {rev_growth_rateFindUniqueArgs} args - Arguments to find a Rev_growth_rate
     * @example
     * // Get one Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rev_growth_rateFindUniqueArgs>(args: SelectSubset<T, rev_growth_rateFindUniqueArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Rev_growth_rate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {rev_growth_rateFindUniqueOrThrowArgs} args - Arguments to find a Rev_growth_rate
     * @example
     * // Get one Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rev_growth_rateFindUniqueOrThrowArgs>(args: SelectSubset<T, rev_growth_rateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Rev_growth_rate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateFindFirstArgs} args - Arguments to find a Rev_growth_rate
     * @example
     * // Get one Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rev_growth_rateFindFirstArgs>(args?: SelectSubset<T, rev_growth_rateFindFirstArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Rev_growth_rate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateFindFirstOrThrowArgs} args - Arguments to find a Rev_growth_rate
     * @example
     * // Get one Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rev_growth_rateFindFirstOrThrowArgs>(args?: SelectSubset<T, rev_growth_rateFindFirstOrThrowArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rev_growth_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rev_growth_rates
     * const rev_growth_rates = await prisma.rev_growth_rate.findMany()
     * 
     * // Get first 10 Rev_growth_rates
     * const rev_growth_rates = await prisma.rev_growth_rate.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const rev_growth_rateWithIndustryOnly = await prisma.rev_growth_rate.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends rev_growth_rateFindManyArgs>(args?: SelectSubset<T, rev_growth_rateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Rev_growth_rate.
     * @param {rev_growth_rateCreateArgs} args - Arguments to create a Rev_growth_rate.
     * @example
     * // Create one Rev_growth_rate
     * const Rev_growth_rate = await prisma.rev_growth_rate.create({
     *   data: {
     *     // ... data to create a Rev_growth_rate
     *   }
     * })
     * 
     */
    create<T extends rev_growth_rateCreateArgs>(args: SelectSubset<T, rev_growth_rateCreateArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rev_growth_rates.
     * @param {rev_growth_rateCreateManyArgs} args - Arguments to create many Rev_growth_rates.
     * @example
     * // Create many Rev_growth_rates
     * const rev_growth_rate = await prisma.rev_growth_rate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rev_growth_rateCreateManyArgs>(args?: SelectSubset<T, rev_growth_rateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rev_growth_rates and returns the data saved in the database.
     * @param {rev_growth_rateCreateManyAndReturnArgs} args - Arguments to create many Rev_growth_rates.
     * @example
     * // Create many Rev_growth_rates
     * const rev_growth_rate = await prisma.rev_growth_rate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rev_growth_rates and only return the `industry`
     * const rev_growth_rateWithIndustryOnly = await prisma.rev_growth_rate.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rev_growth_rateCreateManyAndReturnArgs>(args?: SelectSubset<T, rev_growth_rateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Rev_growth_rate.
     * @param {rev_growth_rateDeleteArgs} args - Arguments to delete one Rev_growth_rate.
     * @example
     * // Delete one Rev_growth_rate
     * const Rev_growth_rate = await prisma.rev_growth_rate.delete({
     *   where: {
     *     // ... filter to delete one Rev_growth_rate
     *   }
     * })
     * 
     */
    delete<T extends rev_growth_rateDeleteArgs>(args: SelectSubset<T, rev_growth_rateDeleteArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Rev_growth_rate.
     * @param {rev_growth_rateUpdateArgs} args - Arguments to update one Rev_growth_rate.
     * @example
     * // Update one Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rev_growth_rateUpdateArgs>(args: SelectSubset<T, rev_growth_rateUpdateArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rev_growth_rates.
     * @param {rev_growth_rateDeleteManyArgs} args - Arguments to filter Rev_growth_rates to delete.
     * @example
     * // Delete a few Rev_growth_rates
     * const { count } = await prisma.rev_growth_rate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rev_growth_rateDeleteManyArgs>(args?: SelectSubset<T, rev_growth_rateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rev_growth_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rev_growth_rates
     * const rev_growth_rate = await prisma.rev_growth_rate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rev_growth_rateUpdateManyArgs>(args: SelectSubset<T, rev_growth_rateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Rev_growth_rate.
     * @param {rev_growth_rateUpsertArgs} args - Arguments to update or create a Rev_growth_rate.
     * @example
     * // Update or create a Rev_growth_rate
     * const rev_growth_rate = await prisma.rev_growth_rate.upsert({
     *   create: {
     *     // ... data to create a Rev_growth_rate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rev_growth_rate we want to update
     *   }
     * })
     */
    upsert<T extends rev_growth_rateUpsertArgs>(args: SelectSubset<T, rev_growth_rateUpsertArgs<ExtArgs>>): Prisma__rev_growth_rateClient<$Result.GetResult<Prisma.$rev_growth_ratePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rev_growth_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateCountArgs} args - Arguments to filter Rev_growth_rates to count.
     * @example
     * // Count the number of Rev_growth_rates
     * const count = await prisma.rev_growth_rate.count({
     *   where: {
     *     // ... the filter for the Rev_growth_rates we want to count
     *   }
     * })
    **/
    count<T extends rev_growth_rateCountArgs>(
      args?: Subset<T, rev_growth_rateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Rev_growth_rateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rev_growth_rate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Rev_growth_rateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Rev_growth_rateAggregateArgs>(args: Subset<T, Rev_growth_rateAggregateArgs>): Prisma.PrismaPromise<GetRev_growth_rateAggregateType<T>>

    /**
     * Group by Rev_growth_rate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rev_growth_rateGroupByArgs} args - Group by arguments.
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
      T extends rev_growth_rateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rev_growth_rateGroupByArgs['orderBy'] }
        : { orderBy?: rev_growth_rateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, rev_growth_rateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRev_growth_rateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rev_growth_rate model
   */
  readonly fields: rev_growth_rateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rev_growth_rate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rev_growth_rateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the rev_growth_rate model
   */ 
  interface rev_growth_rateFieldRefs {
    readonly industry: FieldRef<"rev_growth_rate", 'String'>
    readonly no_of_firms: FieldRef<"rev_growth_rate", 'String'>
    readonly cagr_net_income_last_5_years: FieldRef<"rev_growth_rate", 'String'>
    readonly cagr_net_rev_last_5_years: FieldRef<"rev_growth_rate", 'String'>
    readonly expected_growth_rev_next_2_years: FieldRef<"rev_growth_rate", 'String'>
    readonly expected_growth_rev_next_5_years: FieldRef<"rev_growth_rate", 'String'>
    readonly expected_growth_eps_next_5_years: FieldRef<"rev_growth_rate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * rev_growth_rate findUnique
   */
  export type rev_growth_rateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter, which rev_growth_rate to fetch.
     */
    where: rev_growth_rateWhereUniqueInput
  }

  /**
   * rev_growth_rate findUniqueOrThrow
   */
  export type rev_growth_rateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter, which rev_growth_rate to fetch.
     */
    where: rev_growth_rateWhereUniqueInput
  }

  /**
   * rev_growth_rate findFirst
   */
  export type rev_growth_rateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter, which rev_growth_rate to fetch.
     */
    where?: rev_growth_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rev_growth_rates to fetch.
     */
    orderBy?: rev_growth_rateOrderByWithRelationInput | rev_growth_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rev_growth_rates.
     */
    cursor?: rev_growth_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rev_growth_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rev_growth_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rev_growth_rates.
     */
    distinct?: Rev_growth_rateScalarFieldEnum | Rev_growth_rateScalarFieldEnum[]
  }

  /**
   * rev_growth_rate findFirstOrThrow
   */
  export type rev_growth_rateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter, which rev_growth_rate to fetch.
     */
    where?: rev_growth_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rev_growth_rates to fetch.
     */
    orderBy?: rev_growth_rateOrderByWithRelationInput | rev_growth_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rev_growth_rates.
     */
    cursor?: rev_growth_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rev_growth_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rev_growth_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rev_growth_rates.
     */
    distinct?: Rev_growth_rateScalarFieldEnum | Rev_growth_rateScalarFieldEnum[]
  }

  /**
   * rev_growth_rate findMany
   */
  export type rev_growth_rateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter, which rev_growth_rates to fetch.
     */
    where?: rev_growth_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rev_growth_rates to fetch.
     */
    orderBy?: rev_growth_rateOrderByWithRelationInput | rev_growth_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rev_growth_rates.
     */
    cursor?: rev_growth_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rev_growth_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rev_growth_rates.
     */
    skip?: number
    distinct?: Rev_growth_rateScalarFieldEnum | Rev_growth_rateScalarFieldEnum[]
  }

  /**
   * rev_growth_rate create
   */
  export type rev_growth_rateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * The data needed to create a rev_growth_rate.
     */
    data: XOR<rev_growth_rateCreateInput, rev_growth_rateUncheckedCreateInput>
  }

  /**
   * rev_growth_rate createMany
   */
  export type rev_growth_rateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rev_growth_rates.
     */
    data: rev_growth_rateCreateManyInput | rev_growth_rateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rev_growth_rate createManyAndReturn
   */
  export type rev_growth_rateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many rev_growth_rates.
     */
    data: rev_growth_rateCreateManyInput | rev_growth_rateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rev_growth_rate update
   */
  export type rev_growth_rateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * The data needed to update a rev_growth_rate.
     */
    data: XOR<rev_growth_rateUpdateInput, rev_growth_rateUncheckedUpdateInput>
    /**
     * Choose, which rev_growth_rate to update.
     */
    where: rev_growth_rateWhereUniqueInput
  }

  /**
   * rev_growth_rate updateMany
   */
  export type rev_growth_rateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rev_growth_rates.
     */
    data: XOR<rev_growth_rateUpdateManyMutationInput, rev_growth_rateUncheckedUpdateManyInput>
    /**
     * Filter which rev_growth_rates to update
     */
    where?: rev_growth_rateWhereInput
  }

  /**
   * rev_growth_rate upsert
   */
  export type rev_growth_rateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * The filter to search for the rev_growth_rate to update in case it exists.
     */
    where: rev_growth_rateWhereUniqueInput
    /**
     * In case the rev_growth_rate found by the `where` argument doesn't exist, create a new rev_growth_rate with this data.
     */
    create: XOR<rev_growth_rateCreateInput, rev_growth_rateUncheckedCreateInput>
    /**
     * In case the rev_growth_rate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rev_growth_rateUpdateInput, rev_growth_rateUncheckedUpdateInput>
  }

  /**
   * rev_growth_rate delete
   */
  export type rev_growth_rateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
    /**
     * Filter which rev_growth_rate to delete.
     */
    where: rev_growth_rateWhereUniqueInput
  }

  /**
   * rev_growth_rate deleteMany
   */
  export type rev_growth_rateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rev_growth_rates to delete
     */
    where?: rev_growth_rateWhereInput
  }

  /**
   * rev_growth_rate without action
   */
  export type rev_growth_rateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rev_growth_rate
     */
    select?: rev_growth_rateSelect<ExtArgs> | null
  }


  /**
   * Model sales_to_cap_us
   */

  export type AggregateSales_to_cap_us = {
    _count: Sales_to_cap_usCountAggregateOutputType | null
    _min: Sales_to_cap_usMinAggregateOutputType | null
    _max: Sales_to_cap_usMaxAggregateOutputType | null
  }

  export type Sales_to_cap_usMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    capex: string | null
    depre_amort: string | null
    capex_depre: string | null
    acquisitions: string | null
    net_r_and_d: string | null
    net_capex_sales: string | null
    net_capex_ebit_aftertax: string | null
    sales_invested_capital: string | null
  }

  export type Sales_to_cap_usMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    capex: string | null
    depre_amort: string | null
    capex_depre: string | null
    acquisitions: string | null
    net_r_and_d: string | null
    net_capex_sales: string | null
    net_capex_ebit_aftertax: string | null
    sales_invested_capital: string | null
  }

  export type Sales_to_cap_usCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    capex: number
    depre_amort: number
    capex_depre: number
    acquisitions: number
    net_r_and_d: number
    net_capex_sales: number
    net_capex_ebit_aftertax: number
    sales_invested_capital: number
    _all: number
  }


  export type Sales_to_cap_usMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    capex?: true
    depre_amort?: true
    capex_depre?: true
    acquisitions?: true
    net_r_and_d?: true
    net_capex_sales?: true
    net_capex_ebit_aftertax?: true
    sales_invested_capital?: true
  }

  export type Sales_to_cap_usMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    capex?: true
    depre_amort?: true
    capex_depre?: true
    acquisitions?: true
    net_r_and_d?: true
    net_capex_sales?: true
    net_capex_ebit_aftertax?: true
    sales_invested_capital?: true
  }

  export type Sales_to_cap_usCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    capex?: true
    depre_amort?: true
    capex_depre?: true
    acquisitions?: true
    net_r_and_d?: true
    net_capex_sales?: true
    net_capex_ebit_aftertax?: true
    sales_invested_capital?: true
    _all?: true
  }

  export type Sales_to_cap_usAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sales_to_cap_us to aggregate.
     */
    where?: sales_to_cap_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales_to_cap_uses to fetch.
     */
    orderBy?: sales_to_cap_usOrderByWithRelationInput | sales_to_cap_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sales_to_cap_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales_to_cap_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales_to_cap_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sales_to_cap_uses
    **/
    _count?: true | Sales_to_cap_usCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sales_to_cap_usMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sales_to_cap_usMaxAggregateInputType
  }

  export type GetSales_to_cap_usAggregateType<T extends Sales_to_cap_usAggregateArgs> = {
        [P in keyof T & keyof AggregateSales_to_cap_us]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSales_to_cap_us[P]>
      : GetScalarType<T[P], AggregateSales_to_cap_us[P]>
  }




  export type sales_to_cap_usGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sales_to_cap_usWhereInput
    orderBy?: sales_to_cap_usOrderByWithAggregationInput | sales_to_cap_usOrderByWithAggregationInput[]
    by: Sales_to_cap_usScalarFieldEnum[] | Sales_to_cap_usScalarFieldEnum
    having?: sales_to_cap_usScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sales_to_cap_usCountAggregateInputType | true
    _min?: Sales_to_cap_usMinAggregateInputType
    _max?: Sales_to_cap_usMaxAggregateInputType
  }

  export type Sales_to_cap_usGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    capex: string | null
    depre_amort: string | null
    capex_depre: string | null
    acquisitions: string | null
    net_r_and_d: string | null
    net_capex_sales: string | null
    net_capex_ebit_aftertax: string | null
    sales_invested_capital: string | null
    _count: Sales_to_cap_usCountAggregateOutputType | null
    _min: Sales_to_cap_usMinAggregateOutputType | null
    _max: Sales_to_cap_usMaxAggregateOutputType | null
  }

  type GetSales_to_cap_usGroupByPayload<T extends sales_to_cap_usGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sales_to_cap_usGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sales_to_cap_usGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sales_to_cap_usGroupByOutputType[P]>
            : GetScalarType<T[P], Sales_to_cap_usGroupByOutputType[P]>
        }
      >
    >


  export type sales_to_cap_usSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    capex?: boolean
    depre_amort?: boolean
    capex_depre?: boolean
    acquisitions?: boolean
    net_r_and_d?: boolean
    net_capex_sales?: boolean
    net_capex_ebit_aftertax?: boolean
    sales_invested_capital?: boolean
  }, ExtArgs["result"]["sales_to_cap_us"]>

  export type sales_to_cap_usSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    capex?: boolean
    depre_amort?: boolean
    capex_depre?: boolean
    acquisitions?: boolean
    net_r_and_d?: boolean
    net_capex_sales?: boolean
    net_capex_ebit_aftertax?: boolean
    sales_invested_capital?: boolean
  }, ExtArgs["result"]["sales_to_cap_us"]>

  export type sales_to_cap_usSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    capex?: boolean
    depre_amort?: boolean
    capex_depre?: boolean
    acquisitions?: boolean
    net_r_and_d?: boolean
    net_capex_sales?: boolean
    net_capex_ebit_aftertax?: boolean
    sales_invested_capital?: boolean
  }


  export type $sales_to_cap_usPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sales_to_cap_us"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      capex: string | null
      depre_amort: string | null
      capex_depre: string | null
      acquisitions: string | null
      net_r_and_d: string | null
      net_capex_sales: string | null
      net_capex_ebit_aftertax: string | null
      sales_invested_capital: string | null
    }, ExtArgs["result"]["sales_to_cap_us"]>
    composites: {}
  }

  type sales_to_cap_usGetPayload<S extends boolean | null | undefined | sales_to_cap_usDefaultArgs> = $Result.GetResult<Prisma.$sales_to_cap_usPayload, S>

  type sales_to_cap_usCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<sales_to_cap_usFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Sales_to_cap_usCountAggregateInputType | true
    }

  export interface sales_to_cap_usDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sales_to_cap_us'], meta: { name: 'sales_to_cap_us' } }
    /**
     * Find zero or one Sales_to_cap_us that matches the filter.
     * @param {sales_to_cap_usFindUniqueArgs} args - Arguments to find a Sales_to_cap_us
     * @example
     * // Get one Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sales_to_cap_usFindUniqueArgs>(args: SelectSubset<T, sales_to_cap_usFindUniqueArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sales_to_cap_us that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {sales_to_cap_usFindUniqueOrThrowArgs} args - Arguments to find a Sales_to_cap_us
     * @example
     * // Get one Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sales_to_cap_usFindUniqueOrThrowArgs>(args: SelectSubset<T, sales_to_cap_usFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sales_to_cap_us that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usFindFirstArgs} args - Arguments to find a Sales_to_cap_us
     * @example
     * // Get one Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sales_to_cap_usFindFirstArgs>(args?: SelectSubset<T, sales_to_cap_usFindFirstArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sales_to_cap_us that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usFindFirstOrThrowArgs} args - Arguments to find a Sales_to_cap_us
     * @example
     * // Get one Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sales_to_cap_usFindFirstOrThrowArgs>(args?: SelectSubset<T, sales_to_cap_usFindFirstOrThrowArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sales_to_cap_uses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales_to_cap_uses
     * const sales_to_cap_uses = await prisma.sales_to_cap_us.findMany()
     * 
     * // Get first 10 Sales_to_cap_uses
     * const sales_to_cap_uses = await prisma.sales_to_cap_us.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const sales_to_cap_usWithIndustryOnly = await prisma.sales_to_cap_us.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends sales_to_cap_usFindManyArgs>(args?: SelectSubset<T, sales_to_cap_usFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sales_to_cap_us.
     * @param {sales_to_cap_usCreateArgs} args - Arguments to create a Sales_to_cap_us.
     * @example
     * // Create one Sales_to_cap_us
     * const Sales_to_cap_us = await prisma.sales_to_cap_us.create({
     *   data: {
     *     // ... data to create a Sales_to_cap_us
     *   }
     * })
     * 
     */
    create<T extends sales_to_cap_usCreateArgs>(args: SelectSubset<T, sales_to_cap_usCreateArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sales_to_cap_uses.
     * @param {sales_to_cap_usCreateManyArgs} args - Arguments to create many Sales_to_cap_uses.
     * @example
     * // Create many Sales_to_cap_uses
     * const sales_to_cap_us = await prisma.sales_to_cap_us.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sales_to_cap_usCreateManyArgs>(args?: SelectSubset<T, sales_to_cap_usCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales_to_cap_uses and returns the data saved in the database.
     * @param {sales_to_cap_usCreateManyAndReturnArgs} args - Arguments to create many Sales_to_cap_uses.
     * @example
     * // Create many Sales_to_cap_uses
     * const sales_to_cap_us = await prisma.sales_to_cap_us.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales_to_cap_uses and only return the `industry`
     * const sales_to_cap_usWithIndustryOnly = await prisma.sales_to_cap_us.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sales_to_cap_usCreateManyAndReturnArgs>(args?: SelectSubset<T, sales_to_cap_usCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sales_to_cap_us.
     * @param {sales_to_cap_usDeleteArgs} args - Arguments to delete one Sales_to_cap_us.
     * @example
     * // Delete one Sales_to_cap_us
     * const Sales_to_cap_us = await prisma.sales_to_cap_us.delete({
     *   where: {
     *     // ... filter to delete one Sales_to_cap_us
     *   }
     * })
     * 
     */
    delete<T extends sales_to_cap_usDeleteArgs>(args: SelectSubset<T, sales_to_cap_usDeleteArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sales_to_cap_us.
     * @param {sales_to_cap_usUpdateArgs} args - Arguments to update one Sales_to_cap_us.
     * @example
     * // Update one Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sales_to_cap_usUpdateArgs>(args: SelectSubset<T, sales_to_cap_usUpdateArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sales_to_cap_uses.
     * @param {sales_to_cap_usDeleteManyArgs} args - Arguments to filter Sales_to_cap_uses to delete.
     * @example
     * // Delete a few Sales_to_cap_uses
     * const { count } = await prisma.sales_to_cap_us.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sales_to_cap_usDeleteManyArgs>(args?: SelectSubset<T, sales_to_cap_usDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales_to_cap_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales_to_cap_uses
     * const sales_to_cap_us = await prisma.sales_to_cap_us.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sales_to_cap_usUpdateManyArgs>(args: SelectSubset<T, sales_to_cap_usUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sales_to_cap_us.
     * @param {sales_to_cap_usUpsertArgs} args - Arguments to update or create a Sales_to_cap_us.
     * @example
     * // Update or create a Sales_to_cap_us
     * const sales_to_cap_us = await prisma.sales_to_cap_us.upsert({
     *   create: {
     *     // ... data to create a Sales_to_cap_us
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sales_to_cap_us we want to update
     *   }
     * })
     */
    upsert<T extends sales_to_cap_usUpsertArgs>(args: SelectSubset<T, sales_to_cap_usUpsertArgs<ExtArgs>>): Prisma__sales_to_cap_usClient<$Result.GetResult<Prisma.$sales_to_cap_usPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sales_to_cap_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usCountArgs} args - Arguments to filter Sales_to_cap_uses to count.
     * @example
     * // Count the number of Sales_to_cap_uses
     * const count = await prisma.sales_to_cap_us.count({
     *   where: {
     *     // ... the filter for the Sales_to_cap_uses we want to count
     *   }
     * })
    **/
    count<T extends sales_to_cap_usCountArgs>(
      args?: Subset<T, sales_to_cap_usCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sales_to_cap_usCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sales_to_cap_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_to_cap_usAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Sales_to_cap_usAggregateArgs>(args: Subset<T, Sales_to_cap_usAggregateArgs>): Prisma.PrismaPromise<GetSales_to_cap_usAggregateType<T>>

    /**
     * Group by Sales_to_cap_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sales_to_cap_usGroupByArgs} args - Group by arguments.
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
      T extends sales_to_cap_usGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sales_to_cap_usGroupByArgs['orderBy'] }
        : { orderBy?: sales_to_cap_usGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, sales_to_cap_usGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSales_to_cap_usGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sales_to_cap_us model
   */
  readonly fields: sales_to_cap_usFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sales_to_cap_us.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sales_to_cap_usClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the sales_to_cap_us model
   */ 
  interface sales_to_cap_usFieldRefs {
    readonly industry: FieldRef<"sales_to_cap_us", 'String'>
    readonly no_of_firms: FieldRef<"sales_to_cap_us", 'String'>
    readonly capex: FieldRef<"sales_to_cap_us", 'String'>
    readonly depre_amort: FieldRef<"sales_to_cap_us", 'String'>
    readonly capex_depre: FieldRef<"sales_to_cap_us", 'String'>
    readonly acquisitions: FieldRef<"sales_to_cap_us", 'String'>
    readonly net_r_and_d: FieldRef<"sales_to_cap_us", 'String'>
    readonly net_capex_sales: FieldRef<"sales_to_cap_us", 'String'>
    readonly net_capex_ebit_aftertax: FieldRef<"sales_to_cap_us", 'String'>
    readonly sales_invested_capital: FieldRef<"sales_to_cap_us", 'String'>
  }
    

  // Custom InputTypes
  /**
   * sales_to_cap_us findUnique
   */
  export type sales_to_cap_usFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter, which sales_to_cap_us to fetch.
     */
    where: sales_to_cap_usWhereUniqueInput
  }

  /**
   * sales_to_cap_us findUniqueOrThrow
   */
  export type sales_to_cap_usFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter, which sales_to_cap_us to fetch.
     */
    where: sales_to_cap_usWhereUniqueInput
  }

  /**
   * sales_to_cap_us findFirst
   */
  export type sales_to_cap_usFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter, which sales_to_cap_us to fetch.
     */
    where?: sales_to_cap_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales_to_cap_uses to fetch.
     */
    orderBy?: sales_to_cap_usOrderByWithRelationInput | sales_to_cap_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sales_to_cap_uses.
     */
    cursor?: sales_to_cap_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales_to_cap_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales_to_cap_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sales_to_cap_uses.
     */
    distinct?: Sales_to_cap_usScalarFieldEnum | Sales_to_cap_usScalarFieldEnum[]
  }

  /**
   * sales_to_cap_us findFirstOrThrow
   */
  export type sales_to_cap_usFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter, which sales_to_cap_us to fetch.
     */
    where?: sales_to_cap_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales_to_cap_uses to fetch.
     */
    orderBy?: sales_to_cap_usOrderByWithRelationInput | sales_to_cap_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sales_to_cap_uses.
     */
    cursor?: sales_to_cap_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales_to_cap_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales_to_cap_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sales_to_cap_uses.
     */
    distinct?: Sales_to_cap_usScalarFieldEnum | Sales_to_cap_usScalarFieldEnum[]
  }

  /**
   * sales_to_cap_us findMany
   */
  export type sales_to_cap_usFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter, which sales_to_cap_uses to fetch.
     */
    where?: sales_to_cap_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales_to_cap_uses to fetch.
     */
    orderBy?: sales_to_cap_usOrderByWithRelationInput | sales_to_cap_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sales_to_cap_uses.
     */
    cursor?: sales_to_cap_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales_to_cap_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales_to_cap_uses.
     */
    skip?: number
    distinct?: Sales_to_cap_usScalarFieldEnum | Sales_to_cap_usScalarFieldEnum[]
  }

  /**
   * sales_to_cap_us create
   */
  export type sales_to_cap_usCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * The data needed to create a sales_to_cap_us.
     */
    data: XOR<sales_to_cap_usCreateInput, sales_to_cap_usUncheckedCreateInput>
  }

  /**
   * sales_to_cap_us createMany
   */
  export type sales_to_cap_usCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sales_to_cap_uses.
     */
    data: sales_to_cap_usCreateManyInput | sales_to_cap_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sales_to_cap_us createManyAndReturn
   */
  export type sales_to_cap_usCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many sales_to_cap_uses.
     */
    data: sales_to_cap_usCreateManyInput | sales_to_cap_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sales_to_cap_us update
   */
  export type sales_to_cap_usUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * The data needed to update a sales_to_cap_us.
     */
    data: XOR<sales_to_cap_usUpdateInput, sales_to_cap_usUncheckedUpdateInput>
    /**
     * Choose, which sales_to_cap_us to update.
     */
    where: sales_to_cap_usWhereUniqueInput
  }

  /**
   * sales_to_cap_us updateMany
   */
  export type sales_to_cap_usUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sales_to_cap_uses.
     */
    data: XOR<sales_to_cap_usUpdateManyMutationInput, sales_to_cap_usUncheckedUpdateManyInput>
    /**
     * Filter which sales_to_cap_uses to update
     */
    where?: sales_to_cap_usWhereInput
  }

  /**
   * sales_to_cap_us upsert
   */
  export type sales_to_cap_usUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * The filter to search for the sales_to_cap_us to update in case it exists.
     */
    where: sales_to_cap_usWhereUniqueInput
    /**
     * In case the sales_to_cap_us found by the `where` argument doesn't exist, create a new sales_to_cap_us with this data.
     */
    create: XOR<sales_to_cap_usCreateInput, sales_to_cap_usUncheckedCreateInput>
    /**
     * In case the sales_to_cap_us was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sales_to_cap_usUpdateInput, sales_to_cap_usUncheckedUpdateInput>
  }

  /**
   * sales_to_cap_us delete
   */
  export type sales_to_cap_usDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
    /**
     * Filter which sales_to_cap_us to delete.
     */
    where: sales_to_cap_usWhereUniqueInput
  }

  /**
   * sales_to_cap_us deleteMany
   */
  export type sales_to_cap_usDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sales_to_cap_uses to delete
     */
    where?: sales_to_cap_usWhereInput
  }

  /**
   * sales_to_cap_us without action
   */
  export type sales_to_cap_usDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sales_to_cap_us
     */
    select?: sales_to_cap_usSelect<ExtArgs> | null
  }


  /**
   * Model effective_tax_rate
   */

  export type AggregateEffective_tax_rate = {
    _count: Effective_tax_rateCountAggregateOutputType | null
    _min: Effective_tax_rateMinAggregateOutputType | null
    _max: Effective_tax_rateMaxAggregateOutputType | null
  }

  export type Effective_tax_rateMinAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    total_taxable_income: string | null
    total_taxes_paid_accrual: string | null
    total_cash_taxes_paid: string | null
    cash_taxes_accrual_taxes: string | null
    effectivetr_avg_across_all_comp: string | null
    effectivetr_avg_across_money_making_comp: string | null
    effectivetr_agg_tax_rate: string | null
    cashtr_avg_across_money_making_comp: string | null
    cashtr_agg_tax_rate: string | null
  }

  export type Effective_tax_rateMaxAggregateOutputType = {
    industry: string | null
    no_of_firms: string | null
    total_taxable_income: string | null
    total_taxes_paid_accrual: string | null
    total_cash_taxes_paid: string | null
    cash_taxes_accrual_taxes: string | null
    effectivetr_avg_across_all_comp: string | null
    effectivetr_avg_across_money_making_comp: string | null
    effectivetr_agg_tax_rate: string | null
    cashtr_avg_across_money_making_comp: string | null
    cashtr_agg_tax_rate: string | null
  }

  export type Effective_tax_rateCountAggregateOutputType = {
    industry: number
    no_of_firms: number
    total_taxable_income: number
    total_taxes_paid_accrual: number
    total_cash_taxes_paid: number
    cash_taxes_accrual_taxes: number
    effectivetr_avg_across_all_comp: number
    effectivetr_avg_across_money_making_comp: number
    effectivetr_agg_tax_rate: number
    cashtr_avg_across_money_making_comp: number
    cashtr_agg_tax_rate: number
    _all: number
  }


  export type Effective_tax_rateMinAggregateInputType = {
    industry?: true
    no_of_firms?: true
    total_taxable_income?: true
    total_taxes_paid_accrual?: true
    total_cash_taxes_paid?: true
    cash_taxes_accrual_taxes?: true
    effectivetr_avg_across_all_comp?: true
    effectivetr_avg_across_money_making_comp?: true
    effectivetr_agg_tax_rate?: true
    cashtr_avg_across_money_making_comp?: true
    cashtr_agg_tax_rate?: true
  }

  export type Effective_tax_rateMaxAggregateInputType = {
    industry?: true
    no_of_firms?: true
    total_taxable_income?: true
    total_taxes_paid_accrual?: true
    total_cash_taxes_paid?: true
    cash_taxes_accrual_taxes?: true
    effectivetr_avg_across_all_comp?: true
    effectivetr_avg_across_money_making_comp?: true
    effectivetr_agg_tax_rate?: true
    cashtr_avg_across_money_making_comp?: true
    cashtr_agg_tax_rate?: true
  }

  export type Effective_tax_rateCountAggregateInputType = {
    industry?: true
    no_of_firms?: true
    total_taxable_income?: true
    total_taxes_paid_accrual?: true
    total_cash_taxes_paid?: true
    cash_taxes_accrual_taxes?: true
    effectivetr_avg_across_all_comp?: true
    effectivetr_avg_across_money_making_comp?: true
    effectivetr_agg_tax_rate?: true
    cashtr_avg_across_money_making_comp?: true
    cashtr_agg_tax_rate?: true
    _all?: true
  }

  export type Effective_tax_rateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which effective_tax_rate to aggregate.
     */
    where?: effective_tax_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of effective_tax_rates to fetch.
     */
    orderBy?: effective_tax_rateOrderByWithRelationInput | effective_tax_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: effective_tax_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` effective_tax_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` effective_tax_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned effective_tax_rates
    **/
    _count?: true | Effective_tax_rateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Effective_tax_rateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Effective_tax_rateMaxAggregateInputType
  }

  export type GetEffective_tax_rateAggregateType<T extends Effective_tax_rateAggregateArgs> = {
        [P in keyof T & keyof AggregateEffective_tax_rate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEffective_tax_rate[P]>
      : GetScalarType<T[P], AggregateEffective_tax_rate[P]>
  }




  export type effective_tax_rateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: effective_tax_rateWhereInput
    orderBy?: effective_tax_rateOrderByWithAggregationInput | effective_tax_rateOrderByWithAggregationInput[]
    by: Effective_tax_rateScalarFieldEnum[] | Effective_tax_rateScalarFieldEnum
    having?: effective_tax_rateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Effective_tax_rateCountAggregateInputType | true
    _min?: Effective_tax_rateMinAggregateInputType
    _max?: Effective_tax_rateMaxAggregateInputType
  }

  export type Effective_tax_rateGroupByOutputType = {
    industry: string
    no_of_firms: string | null
    total_taxable_income: string | null
    total_taxes_paid_accrual: string | null
    total_cash_taxes_paid: string | null
    cash_taxes_accrual_taxes: string | null
    effectivetr_avg_across_all_comp: string | null
    effectivetr_avg_across_money_making_comp: string | null
    effectivetr_agg_tax_rate: string | null
    cashtr_avg_across_money_making_comp: string | null
    cashtr_agg_tax_rate: string | null
    _count: Effective_tax_rateCountAggregateOutputType | null
    _min: Effective_tax_rateMinAggregateOutputType | null
    _max: Effective_tax_rateMaxAggregateOutputType | null
  }

  type GetEffective_tax_rateGroupByPayload<T extends effective_tax_rateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Effective_tax_rateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Effective_tax_rateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Effective_tax_rateGroupByOutputType[P]>
            : GetScalarType<T[P], Effective_tax_rateGroupByOutputType[P]>
        }
      >
    >


  export type effective_tax_rateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    total_taxable_income?: boolean
    total_taxes_paid_accrual?: boolean
    total_cash_taxes_paid?: boolean
    cash_taxes_accrual_taxes?: boolean
    effectivetr_avg_across_all_comp?: boolean
    effectivetr_avg_across_money_making_comp?: boolean
    effectivetr_agg_tax_rate?: boolean
    cashtr_avg_across_money_making_comp?: boolean
    cashtr_agg_tax_rate?: boolean
  }, ExtArgs["result"]["effective_tax_rate"]>

  export type effective_tax_rateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    no_of_firms?: boolean
    total_taxable_income?: boolean
    total_taxes_paid_accrual?: boolean
    total_cash_taxes_paid?: boolean
    cash_taxes_accrual_taxes?: boolean
    effectivetr_avg_across_all_comp?: boolean
    effectivetr_avg_across_money_making_comp?: boolean
    effectivetr_agg_tax_rate?: boolean
    cashtr_avg_across_money_making_comp?: boolean
    cashtr_agg_tax_rate?: boolean
  }, ExtArgs["result"]["effective_tax_rate"]>

  export type effective_tax_rateSelectScalar = {
    industry?: boolean
    no_of_firms?: boolean
    total_taxable_income?: boolean
    total_taxes_paid_accrual?: boolean
    total_cash_taxes_paid?: boolean
    cash_taxes_accrual_taxes?: boolean
    effectivetr_avg_across_all_comp?: boolean
    effectivetr_avg_across_money_making_comp?: boolean
    effectivetr_agg_tax_rate?: boolean
    cashtr_avg_across_money_making_comp?: boolean
    cashtr_agg_tax_rate?: boolean
  }


  export type $effective_tax_ratePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "effective_tax_rate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      no_of_firms: string | null
      total_taxable_income: string | null
      total_taxes_paid_accrual: string | null
      total_cash_taxes_paid: string | null
      cash_taxes_accrual_taxes: string | null
      effectivetr_avg_across_all_comp: string | null
      effectivetr_avg_across_money_making_comp: string | null
      effectivetr_agg_tax_rate: string | null
      cashtr_avg_across_money_making_comp: string | null
      cashtr_agg_tax_rate: string | null
    }, ExtArgs["result"]["effective_tax_rate"]>
    composites: {}
  }

  type effective_tax_rateGetPayload<S extends boolean | null | undefined | effective_tax_rateDefaultArgs> = $Result.GetResult<Prisma.$effective_tax_ratePayload, S>

  type effective_tax_rateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<effective_tax_rateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Effective_tax_rateCountAggregateInputType | true
    }

  export interface effective_tax_rateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['effective_tax_rate'], meta: { name: 'effective_tax_rate' } }
    /**
     * Find zero or one Effective_tax_rate that matches the filter.
     * @param {effective_tax_rateFindUniqueArgs} args - Arguments to find a Effective_tax_rate
     * @example
     * // Get one Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends effective_tax_rateFindUniqueArgs>(args: SelectSubset<T, effective_tax_rateFindUniqueArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Effective_tax_rate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {effective_tax_rateFindUniqueOrThrowArgs} args - Arguments to find a Effective_tax_rate
     * @example
     * // Get one Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends effective_tax_rateFindUniqueOrThrowArgs>(args: SelectSubset<T, effective_tax_rateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Effective_tax_rate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateFindFirstArgs} args - Arguments to find a Effective_tax_rate
     * @example
     * // Get one Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends effective_tax_rateFindFirstArgs>(args?: SelectSubset<T, effective_tax_rateFindFirstArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Effective_tax_rate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateFindFirstOrThrowArgs} args - Arguments to find a Effective_tax_rate
     * @example
     * // Get one Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends effective_tax_rateFindFirstOrThrowArgs>(args?: SelectSubset<T, effective_tax_rateFindFirstOrThrowArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Effective_tax_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Effective_tax_rates
     * const effective_tax_rates = await prisma.effective_tax_rate.findMany()
     * 
     * // Get first 10 Effective_tax_rates
     * const effective_tax_rates = await prisma.effective_tax_rate.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const effective_tax_rateWithIndustryOnly = await prisma.effective_tax_rate.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends effective_tax_rateFindManyArgs>(args?: SelectSubset<T, effective_tax_rateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Effective_tax_rate.
     * @param {effective_tax_rateCreateArgs} args - Arguments to create a Effective_tax_rate.
     * @example
     * // Create one Effective_tax_rate
     * const Effective_tax_rate = await prisma.effective_tax_rate.create({
     *   data: {
     *     // ... data to create a Effective_tax_rate
     *   }
     * })
     * 
     */
    create<T extends effective_tax_rateCreateArgs>(args: SelectSubset<T, effective_tax_rateCreateArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Effective_tax_rates.
     * @param {effective_tax_rateCreateManyArgs} args - Arguments to create many Effective_tax_rates.
     * @example
     * // Create many Effective_tax_rates
     * const effective_tax_rate = await prisma.effective_tax_rate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends effective_tax_rateCreateManyArgs>(args?: SelectSubset<T, effective_tax_rateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Effective_tax_rates and returns the data saved in the database.
     * @param {effective_tax_rateCreateManyAndReturnArgs} args - Arguments to create many Effective_tax_rates.
     * @example
     * // Create many Effective_tax_rates
     * const effective_tax_rate = await prisma.effective_tax_rate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Effective_tax_rates and only return the `industry`
     * const effective_tax_rateWithIndustryOnly = await prisma.effective_tax_rate.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends effective_tax_rateCreateManyAndReturnArgs>(args?: SelectSubset<T, effective_tax_rateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Effective_tax_rate.
     * @param {effective_tax_rateDeleteArgs} args - Arguments to delete one Effective_tax_rate.
     * @example
     * // Delete one Effective_tax_rate
     * const Effective_tax_rate = await prisma.effective_tax_rate.delete({
     *   where: {
     *     // ... filter to delete one Effective_tax_rate
     *   }
     * })
     * 
     */
    delete<T extends effective_tax_rateDeleteArgs>(args: SelectSubset<T, effective_tax_rateDeleteArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Effective_tax_rate.
     * @param {effective_tax_rateUpdateArgs} args - Arguments to update one Effective_tax_rate.
     * @example
     * // Update one Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends effective_tax_rateUpdateArgs>(args: SelectSubset<T, effective_tax_rateUpdateArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Effective_tax_rates.
     * @param {effective_tax_rateDeleteManyArgs} args - Arguments to filter Effective_tax_rates to delete.
     * @example
     * // Delete a few Effective_tax_rates
     * const { count } = await prisma.effective_tax_rate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends effective_tax_rateDeleteManyArgs>(args?: SelectSubset<T, effective_tax_rateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Effective_tax_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Effective_tax_rates
     * const effective_tax_rate = await prisma.effective_tax_rate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends effective_tax_rateUpdateManyArgs>(args: SelectSubset<T, effective_tax_rateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Effective_tax_rate.
     * @param {effective_tax_rateUpsertArgs} args - Arguments to update or create a Effective_tax_rate.
     * @example
     * // Update or create a Effective_tax_rate
     * const effective_tax_rate = await prisma.effective_tax_rate.upsert({
     *   create: {
     *     // ... data to create a Effective_tax_rate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Effective_tax_rate we want to update
     *   }
     * })
     */
    upsert<T extends effective_tax_rateUpsertArgs>(args: SelectSubset<T, effective_tax_rateUpsertArgs<ExtArgs>>): Prisma__effective_tax_rateClient<$Result.GetResult<Prisma.$effective_tax_ratePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Effective_tax_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateCountArgs} args - Arguments to filter Effective_tax_rates to count.
     * @example
     * // Count the number of Effective_tax_rates
     * const count = await prisma.effective_tax_rate.count({
     *   where: {
     *     // ... the filter for the Effective_tax_rates we want to count
     *   }
     * })
    **/
    count<T extends effective_tax_rateCountArgs>(
      args?: Subset<T, effective_tax_rateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Effective_tax_rateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Effective_tax_rate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Effective_tax_rateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Effective_tax_rateAggregateArgs>(args: Subset<T, Effective_tax_rateAggregateArgs>): Prisma.PrismaPromise<GetEffective_tax_rateAggregateType<T>>

    /**
     * Group by Effective_tax_rate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {effective_tax_rateGroupByArgs} args - Group by arguments.
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
      T extends effective_tax_rateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: effective_tax_rateGroupByArgs['orderBy'] }
        : { orderBy?: effective_tax_rateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, effective_tax_rateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEffective_tax_rateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the effective_tax_rate model
   */
  readonly fields: effective_tax_rateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for effective_tax_rate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__effective_tax_rateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the effective_tax_rate model
   */ 
  interface effective_tax_rateFieldRefs {
    readonly industry: FieldRef<"effective_tax_rate", 'String'>
    readonly no_of_firms: FieldRef<"effective_tax_rate", 'String'>
    readonly total_taxable_income: FieldRef<"effective_tax_rate", 'String'>
    readonly total_taxes_paid_accrual: FieldRef<"effective_tax_rate", 'String'>
    readonly total_cash_taxes_paid: FieldRef<"effective_tax_rate", 'String'>
    readonly cash_taxes_accrual_taxes: FieldRef<"effective_tax_rate", 'String'>
    readonly effectivetr_avg_across_all_comp: FieldRef<"effective_tax_rate", 'String'>
    readonly effectivetr_avg_across_money_making_comp: FieldRef<"effective_tax_rate", 'String'>
    readonly effectivetr_agg_tax_rate: FieldRef<"effective_tax_rate", 'String'>
    readonly cashtr_avg_across_money_making_comp: FieldRef<"effective_tax_rate", 'String'>
    readonly cashtr_agg_tax_rate: FieldRef<"effective_tax_rate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * effective_tax_rate findUnique
   */
  export type effective_tax_rateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter, which effective_tax_rate to fetch.
     */
    where: effective_tax_rateWhereUniqueInput
  }

  /**
   * effective_tax_rate findUniqueOrThrow
   */
  export type effective_tax_rateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter, which effective_tax_rate to fetch.
     */
    where: effective_tax_rateWhereUniqueInput
  }

  /**
   * effective_tax_rate findFirst
   */
  export type effective_tax_rateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter, which effective_tax_rate to fetch.
     */
    where?: effective_tax_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of effective_tax_rates to fetch.
     */
    orderBy?: effective_tax_rateOrderByWithRelationInput | effective_tax_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for effective_tax_rates.
     */
    cursor?: effective_tax_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` effective_tax_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` effective_tax_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of effective_tax_rates.
     */
    distinct?: Effective_tax_rateScalarFieldEnum | Effective_tax_rateScalarFieldEnum[]
  }

  /**
   * effective_tax_rate findFirstOrThrow
   */
  export type effective_tax_rateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter, which effective_tax_rate to fetch.
     */
    where?: effective_tax_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of effective_tax_rates to fetch.
     */
    orderBy?: effective_tax_rateOrderByWithRelationInput | effective_tax_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for effective_tax_rates.
     */
    cursor?: effective_tax_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` effective_tax_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` effective_tax_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of effective_tax_rates.
     */
    distinct?: Effective_tax_rateScalarFieldEnum | Effective_tax_rateScalarFieldEnum[]
  }

  /**
   * effective_tax_rate findMany
   */
  export type effective_tax_rateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter, which effective_tax_rates to fetch.
     */
    where?: effective_tax_rateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of effective_tax_rates to fetch.
     */
    orderBy?: effective_tax_rateOrderByWithRelationInput | effective_tax_rateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing effective_tax_rates.
     */
    cursor?: effective_tax_rateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` effective_tax_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` effective_tax_rates.
     */
    skip?: number
    distinct?: Effective_tax_rateScalarFieldEnum | Effective_tax_rateScalarFieldEnum[]
  }

  /**
   * effective_tax_rate create
   */
  export type effective_tax_rateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * The data needed to create a effective_tax_rate.
     */
    data: XOR<effective_tax_rateCreateInput, effective_tax_rateUncheckedCreateInput>
  }

  /**
   * effective_tax_rate createMany
   */
  export type effective_tax_rateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many effective_tax_rates.
     */
    data: effective_tax_rateCreateManyInput | effective_tax_rateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * effective_tax_rate createManyAndReturn
   */
  export type effective_tax_rateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many effective_tax_rates.
     */
    data: effective_tax_rateCreateManyInput | effective_tax_rateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * effective_tax_rate update
   */
  export type effective_tax_rateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * The data needed to update a effective_tax_rate.
     */
    data: XOR<effective_tax_rateUpdateInput, effective_tax_rateUncheckedUpdateInput>
    /**
     * Choose, which effective_tax_rate to update.
     */
    where: effective_tax_rateWhereUniqueInput
  }

  /**
   * effective_tax_rate updateMany
   */
  export type effective_tax_rateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update effective_tax_rates.
     */
    data: XOR<effective_tax_rateUpdateManyMutationInput, effective_tax_rateUncheckedUpdateManyInput>
    /**
     * Filter which effective_tax_rates to update
     */
    where?: effective_tax_rateWhereInput
  }

  /**
   * effective_tax_rate upsert
   */
  export type effective_tax_rateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * The filter to search for the effective_tax_rate to update in case it exists.
     */
    where: effective_tax_rateWhereUniqueInput
    /**
     * In case the effective_tax_rate found by the `where` argument doesn't exist, create a new effective_tax_rate with this data.
     */
    create: XOR<effective_tax_rateCreateInput, effective_tax_rateUncheckedCreateInput>
    /**
     * In case the effective_tax_rate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<effective_tax_rateUpdateInput, effective_tax_rateUncheckedUpdateInput>
  }

  /**
   * effective_tax_rate delete
   */
  export type effective_tax_rateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
    /**
     * Filter which effective_tax_rate to delete.
     */
    where: effective_tax_rateWhereUniqueInput
  }

  /**
   * effective_tax_rate deleteMany
   */
  export type effective_tax_rateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which effective_tax_rates to delete
     */
    where?: effective_tax_rateWhereInput
  }

  /**
   * effective_tax_rate without action
   */
  export type effective_tax_rateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the effective_tax_rate
     */
    select?: effective_tax_rateSelect<ExtArgs> | null
  }


  /**
   * Model default_spread_large_firm
   */

  export type AggregateDefault_spread_large_firm = {
    _count: Default_spread_large_firmCountAggregateOutputType | null
    _min: Default_spread_large_firmMinAggregateOutputType | null
    _max: Default_spread_large_firmMaxAggregateOutputType | null
  }

  export type Default_spread_large_firmMinAggregateOutputType = {
    min: string | null
    max: string | null
    rating: string | null
    spread: string | null
  }

  export type Default_spread_large_firmMaxAggregateOutputType = {
    min: string | null
    max: string | null
    rating: string | null
    spread: string | null
  }

  export type Default_spread_large_firmCountAggregateOutputType = {
    min: number
    max: number
    rating: number
    spread: number
    _all: number
  }


  export type Default_spread_large_firmMinAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
  }

  export type Default_spread_large_firmMaxAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
  }

  export type Default_spread_large_firmCountAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
    _all?: true
  }

  export type Default_spread_large_firmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which default_spread_large_firm to aggregate.
     */
    where?: default_spread_large_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_large_firms to fetch.
     */
    orderBy?: default_spread_large_firmOrderByWithRelationInput | default_spread_large_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: default_spread_large_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_large_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_large_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned default_spread_large_firms
    **/
    _count?: true | Default_spread_large_firmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Default_spread_large_firmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Default_spread_large_firmMaxAggregateInputType
  }

  export type GetDefault_spread_large_firmAggregateType<T extends Default_spread_large_firmAggregateArgs> = {
        [P in keyof T & keyof AggregateDefault_spread_large_firm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDefault_spread_large_firm[P]>
      : GetScalarType<T[P], AggregateDefault_spread_large_firm[P]>
  }




  export type default_spread_large_firmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: default_spread_large_firmWhereInput
    orderBy?: default_spread_large_firmOrderByWithAggregationInput | default_spread_large_firmOrderByWithAggregationInput[]
    by: Default_spread_large_firmScalarFieldEnum[] | Default_spread_large_firmScalarFieldEnum
    having?: default_spread_large_firmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Default_spread_large_firmCountAggregateInputType | true
    _min?: Default_spread_large_firmMinAggregateInputType
    _max?: Default_spread_large_firmMaxAggregateInputType
  }

  export type Default_spread_large_firmGroupByOutputType = {
    min: string | null
    max: string | null
    rating: string
    spread: string | null
    _count: Default_spread_large_firmCountAggregateOutputType | null
    _min: Default_spread_large_firmMinAggregateOutputType | null
    _max: Default_spread_large_firmMaxAggregateOutputType | null
  }

  type GetDefault_spread_large_firmGroupByPayload<T extends default_spread_large_firmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Default_spread_large_firmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Default_spread_large_firmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Default_spread_large_firmGroupByOutputType[P]>
            : GetScalarType<T[P], Default_spread_large_firmGroupByOutputType[P]>
        }
      >
    >


  export type default_spread_large_firmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }, ExtArgs["result"]["default_spread_large_firm"]>

  export type default_spread_large_firmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }, ExtArgs["result"]["default_spread_large_firm"]>

  export type default_spread_large_firmSelectScalar = {
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }


  export type $default_spread_large_firmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "default_spread_large_firm"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      min: string | null
      max: string | null
      rating: string
      spread: string | null
    }, ExtArgs["result"]["default_spread_large_firm"]>
    composites: {}
  }

  type default_spread_large_firmGetPayload<S extends boolean | null | undefined | default_spread_large_firmDefaultArgs> = $Result.GetResult<Prisma.$default_spread_large_firmPayload, S>

  type default_spread_large_firmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<default_spread_large_firmFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Default_spread_large_firmCountAggregateInputType | true
    }

  export interface default_spread_large_firmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['default_spread_large_firm'], meta: { name: 'default_spread_large_firm' } }
    /**
     * Find zero or one Default_spread_large_firm that matches the filter.
     * @param {default_spread_large_firmFindUniqueArgs} args - Arguments to find a Default_spread_large_firm
     * @example
     * // Get one Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends default_spread_large_firmFindUniqueArgs>(args: SelectSubset<T, default_spread_large_firmFindUniqueArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Default_spread_large_firm that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {default_spread_large_firmFindUniqueOrThrowArgs} args - Arguments to find a Default_spread_large_firm
     * @example
     * // Get one Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends default_spread_large_firmFindUniqueOrThrowArgs>(args: SelectSubset<T, default_spread_large_firmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Default_spread_large_firm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmFindFirstArgs} args - Arguments to find a Default_spread_large_firm
     * @example
     * // Get one Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends default_spread_large_firmFindFirstArgs>(args?: SelectSubset<T, default_spread_large_firmFindFirstArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Default_spread_large_firm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmFindFirstOrThrowArgs} args - Arguments to find a Default_spread_large_firm
     * @example
     * // Get one Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends default_spread_large_firmFindFirstOrThrowArgs>(args?: SelectSubset<T, default_spread_large_firmFindFirstOrThrowArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Default_spread_large_firms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Default_spread_large_firms
     * const default_spread_large_firms = await prisma.default_spread_large_firm.findMany()
     * 
     * // Get first 10 Default_spread_large_firms
     * const default_spread_large_firms = await prisma.default_spread_large_firm.findMany({ take: 10 })
     * 
     * // Only select the `min`
     * const default_spread_large_firmWithMinOnly = await prisma.default_spread_large_firm.findMany({ select: { min: true } })
     * 
     */
    findMany<T extends default_spread_large_firmFindManyArgs>(args?: SelectSubset<T, default_spread_large_firmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Default_spread_large_firm.
     * @param {default_spread_large_firmCreateArgs} args - Arguments to create a Default_spread_large_firm.
     * @example
     * // Create one Default_spread_large_firm
     * const Default_spread_large_firm = await prisma.default_spread_large_firm.create({
     *   data: {
     *     // ... data to create a Default_spread_large_firm
     *   }
     * })
     * 
     */
    create<T extends default_spread_large_firmCreateArgs>(args: SelectSubset<T, default_spread_large_firmCreateArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Default_spread_large_firms.
     * @param {default_spread_large_firmCreateManyArgs} args - Arguments to create many Default_spread_large_firms.
     * @example
     * // Create many Default_spread_large_firms
     * const default_spread_large_firm = await prisma.default_spread_large_firm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends default_spread_large_firmCreateManyArgs>(args?: SelectSubset<T, default_spread_large_firmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Default_spread_large_firms and returns the data saved in the database.
     * @param {default_spread_large_firmCreateManyAndReturnArgs} args - Arguments to create many Default_spread_large_firms.
     * @example
     * // Create many Default_spread_large_firms
     * const default_spread_large_firm = await prisma.default_spread_large_firm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Default_spread_large_firms and only return the `min`
     * const default_spread_large_firmWithMinOnly = await prisma.default_spread_large_firm.createManyAndReturn({ 
     *   select: { min: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends default_spread_large_firmCreateManyAndReturnArgs>(args?: SelectSubset<T, default_spread_large_firmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Default_spread_large_firm.
     * @param {default_spread_large_firmDeleteArgs} args - Arguments to delete one Default_spread_large_firm.
     * @example
     * // Delete one Default_spread_large_firm
     * const Default_spread_large_firm = await prisma.default_spread_large_firm.delete({
     *   where: {
     *     // ... filter to delete one Default_spread_large_firm
     *   }
     * })
     * 
     */
    delete<T extends default_spread_large_firmDeleteArgs>(args: SelectSubset<T, default_spread_large_firmDeleteArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Default_spread_large_firm.
     * @param {default_spread_large_firmUpdateArgs} args - Arguments to update one Default_spread_large_firm.
     * @example
     * // Update one Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends default_spread_large_firmUpdateArgs>(args: SelectSubset<T, default_spread_large_firmUpdateArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Default_spread_large_firms.
     * @param {default_spread_large_firmDeleteManyArgs} args - Arguments to filter Default_spread_large_firms to delete.
     * @example
     * // Delete a few Default_spread_large_firms
     * const { count } = await prisma.default_spread_large_firm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends default_spread_large_firmDeleteManyArgs>(args?: SelectSubset<T, default_spread_large_firmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Default_spread_large_firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Default_spread_large_firms
     * const default_spread_large_firm = await prisma.default_spread_large_firm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends default_spread_large_firmUpdateManyArgs>(args: SelectSubset<T, default_spread_large_firmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Default_spread_large_firm.
     * @param {default_spread_large_firmUpsertArgs} args - Arguments to update or create a Default_spread_large_firm.
     * @example
     * // Update or create a Default_spread_large_firm
     * const default_spread_large_firm = await prisma.default_spread_large_firm.upsert({
     *   create: {
     *     // ... data to create a Default_spread_large_firm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Default_spread_large_firm we want to update
     *   }
     * })
     */
    upsert<T extends default_spread_large_firmUpsertArgs>(args: SelectSubset<T, default_spread_large_firmUpsertArgs<ExtArgs>>): Prisma__default_spread_large_firmClient<$Result.GetResult<Prisma.$default_spread_large_firmPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Default_spread_large_firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmCountArgs} args - Arguments to filter Default_spread_large_firms to count.
     * @example
     * // Count the number of Default_spread_large_firms
     * const count = await prisma.default_spread_large_firm.count({
     *   where: {
     *     // ... the filter for the Default_spread_large_firms we want to count
     *   }
     * })
    **/
    count<T extends default_spread_large_firmCountArgs>(
      args?: Subset<T, default_spread_large_firmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Default_spread_large_firmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Default_spread_large_firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Default_spread_large_firmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Default_spread_large_firmAggregateArgs>(args: Subset<T, Default_spread_large_firmAggregateArgs>): Prisma.PrismaPromise<GetDefault_spread_large_firmAggregateType<T>>

    /**
     * Group by Default_spread_large_firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_large_firmGroupByArgs} args - Group by arguments.
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
      T extends default_spread_large_firmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: default_spread_large_firmGroupByArgs['orderBy'] }
        : { orderBy?: default_spread_large_firmGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, default_spread_large_firmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDefault_spread_large_firmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the default_spread_large_firm model
   */
  readonly fields: default_spread_large_firmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for default_spread_large_firm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__default_spread_large_firmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the default_spread_large_firm model
   */ 
  interface default_spread_large_firmFieldRefs {
    readonly min: FieldRef<"default_spread_large_firm", 'String'>
    readonly max: FieldRef<"default_spread_large_firm", 'String'>
    readonly rating: FieldRef<"default_spread_large_firm", 'String'>
    readonly spread: FieldRef<"default_spread_large_firm", 'String'>
  }
    

  // Custom InputTypes
  /**
   * default_spread_large_firm findUnique
   */
  export type default_spread_large_firmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_large_firm to fetch.
     */
    where: default_spread_large_firmWhereUniqueInput
  }

  /**
   * default_spread_large_firm findUniqueOrThrow
   */
  export type default_spread_large_firmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_large_firm to fetch.
     */
    where: default_spread_large_firmWhereUniqueInput
  }

  /**
   * default_spread_large_firm findFirst
   */
  export type default_spread_large_firmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_large_firm to fetch.
     */
    where?: default_spread_large_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_large_firms to fetch.
     */
    orderBy?: default_spread_large_firmOrderByWithRelationInput | default_spread_large_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for default_spread_large_firms.
     */
    cursor?: default_spread_large_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_large_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_large_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of default_spread_large_firms.
     */
    distinct?: Default_spread_large_firmScalarFieldEnum | Default_spread_large_firmScalarFieldEnum[]
  }

  /**
   * default_spread_large_firm findFirstOrThrow
   */
  export type default_spread_large_firmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_large_firm to fetch.
     */
    where?: default_spread_large_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_large_firms to fetch.
     */
    orderBy?: default_spread_large_firmOrderByWithRelationInput | default_spread_large_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for default_spread_large_firms.
     */
    cursor?: default_spread_large_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_large_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_large_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of default_spread_large_firms.
     */
    distinct?: Default_spread_large_firmScalarFieldEnum | Default_spread_large_firmScalarFieldEnum[]
  }

  /**
   * default_spread_large_firm findMany
   */
  export type default_spread_large_firmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_large_firms to fetch.
     */
    where?: default_spread_large_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_large_firms to fetch.
     */
    orderBy?: default_spread_large_firmOrderByWithRelationInput | default_spread_large_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing default_spread_large_firms.
     */
    cursor?: default_spread_large_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_large_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_large_firms.
     */
    skip?: number
    distinct?: Default_spread_large_firmScalarFieldEnum | Default_spread_large_firmScalarFieldEnum[]
  }

  /**
   * default_spread_large_firm create
   */
  export type default_spread_large_firmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * The data needed to create a default_spread_large_firm.
     */
    data: XOR<default_spread_large_firmCreateInput, default_spread_large_firmUncheckedCreateInput>
  }

  /**
   * default_spread_large_firm createMany
   */
  export type default_spread_large_firmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many default_spread_large_firms.
     */
    data: default_spread_large_firmCreateManyInput | default_spread_large_firmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * default_spread_large_firm createManyAndReturn
   */
  export type default_spread_large_firmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many default_spread_large_firms.
     */
    data: default_spread_large_firmCreateManyInput | default_spread_large_firmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * default_spread_large_firm update
   */
  export type default_spread_large_firmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * The data needed to update a default_spread_large_firm.
     */
    data: XOR<default_spread_large_firmUpdateInput, default_spread_large_firmUncheckedUpdateInput>
    /**
     * Choose, which default_spread_large_firm to update.
     */
    where: default_spread_large_firmWhereUniqueInput
  }

  /**
   * default_spread_large_firm updateMany
   */
  export type default_spread_large_firmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update default_spread_large_firms.
     */
    data: XOR<default_spread_large_firmUpdateManyMutationInput, default_spread_large_firmUncheckedUpdateManyInput>
    /**
     * Filter which default_spread_large_firms to update
     */
    where?: default_spread_large_firmWhereInput
  }

  /**
   * default_spread_large_firm upsert
   */
  export type default_spread_large_firmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * The filter to search for the default_spread_large_firm to update in case it exists.
     */
    where: default_spread_large_firmWhereUniqueInput
    /**
     * In case the default_spread_large_firm found by the `where` argument doesn't exist, create a new default_spread_large_firm with this data.
     */
    create: XOR<default_spread_large_firmCreateInput, default_spread_large_firmUncheckedCreateInput>
    /**
     * In case the default_spread_large_firm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<default_spread_large_firmUpdateInput, default_spread_large_firmUncheckedUpdateInput>
  }

  /**
   * default_spread_large_firm delete
   */
  export type default_spread_large_firmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
    /**
     * Filter which default_spread_large_firm to delete.
     */
    where: default_spread_large_firmWhereUniqueInput
  }

  /**
   * default_spread_large_firm deleteMany
   */
  export type default_spread_large_firmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which default_spread_large_firms to delete
     */
    where?: default_spread_large_firmWhereInput
  }

  /**
   * default_spread_large_firm without action
   */
  export type default_spread_large_firmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_large_firm
     */
    select?: default_spread_large_firmSelect<ExtArgs> | null
  }


  /**
   * Model default_spread_small_firm
   */

  export type AggregateDefault_spread_small_firm = {
    _count: Default_spread_small_firmCountAggregateOutputType | null
    _min: Default_spread_small_firmMinAggregateOutputType | null
    _max: Default_spread_small_firmMaxAggregateOutputType | null
  }

  export type Default_spread_small_firmMinAggregateOutputType = {
    min: string | null
    max: string | null
    rating: string | null
    spread: string | null
  }

  export type Default_spread_small_firmMaxAggregateOutputType = {
    min: string | null
    max: string | null
    rating: string | null
    spread: string | null
  }

  export type Default_spread_small_firmCountAggregateOutputType = {
    min: number
    max: number
    rating: number
    spread: number
    _all: number
  }


  export type Default_spread_small_firmMinAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
  }

  export type Default_spread_small_firmMaxAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
  }

  export type Default_spread_small_firmCountAggregateInputType = {
    min?: true
    max?: true
    rating?: true
    spread?: true
    _all?: true
  }

  export type Default_spread_small_firmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which default_spread_small_firm to aggregate.
     */
    where?: default_spread_small_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_small_firms to fetch.
     */
    orderBy?: default_spread_small_firmOrderByWithRelationInput | default_spread_small_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: default_spread_small_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_small_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_small_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned default_spread_small_firms
    **/
    _count?: true | Default_spread_small_firmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Default_spread_small_firmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Default_spread_small_firmMaxAggregateInputType
  }

  export type GetDefault_spread_small_firmAggregateType<T extends Default_spread_small_firmAggregateArgs> = {
        [P in keyof T & keyof AggregateDefault_spread_small_firm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDefault_spread_small_firm[P]>
      : GetScalarType<T[P], AggregateDefault_spread_small_firm[P]>
  }




  export type default_spread_small_firmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: default_spread_small_firmWhereInput
    orderBy?: default_spread_small_firmOrderByWithAggregationInput | default_spread_small_firmOrderByWithAggregationInput[]
    by: Default_spread_small_firmScalarFieldEnum[] | Default_spread_small_firmScalarFieldEnum
    having?: default_spread_small_firmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Default_spread_small_firmCountAggregateInputType | true
    _min?: Default_spread_small_firmMinAggregateInputType
    _max?: Default_spread_small_firmMaxAggregateInputType
  }

  export type Default_spread_small_firmGroupByOutputType = {
    min: string | null
    max: string | null
    rating: string
    spread: string | null
    _count: Default_spread_small_firmCountAggregateOutputType | null
    _min: Default_spread_small_firmMinAggregateOutputType | null
    _max: Default_spread_small_firmMaxAggregateOutputType | null
  }

  type GetDefault_spread_small_firmGroupByPayload<T extends default_spread_small_firmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Default_spread_small_firmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Default_spread_small_firmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Default_spread_small_firmGroupByOutputType[P]>
            : GetScalarType<T[P], Default_spread_small_firmGroupByOutputType[P]>
        }
      >
    >


  export type default_spread_small_firmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }, ExtArgs["result"]["default_spread_small_firm"]>

  export type default_spread_small_firmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }, ExtArgs["result"]["default_spread_small_firm"]>

  export type default_spread_small_firmSelectScalar = {
    min?: boolean
    max?: boolean
    rating?: boolean
    spread?: boolean
  }


  export type $default_spread_small_firmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "default_spread_small_firm"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      min: string | null
      max: string | null
      rating: string
      spread: string | null
    }, ExtArgs["result"]["default_spread_small_firm"]>
    composites: {}
  }

  type default_spread_small_firmGetPayload<S extends boolean | null | undefined | default_spread_small_firmDefaultArgs> = $Result.GetResult<Prisma.$default_spread_small_firmPayload, S>

  type default_spread_small_firmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<default_spread_small_firmFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Default_spread_small_firmCountAggregateInputType | true
    }

  export interface default_spread_small_firmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['default_spread_small_firm'], meta: { name: 'default_spread_small_firm' } }
    /**
     * Find zero or one Default_spread_small_firm that matches the filter.
     * @param {default_spread_small_firmFindUniqueArgs} args - Arguments to find a Default_spread_small_firm
     * @example
     * // Get one Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends default_spread_small_firmFindUniqueArgs>(args: SelectSubset<T, default_spread_small_firmFindUniqueArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Default_spread_small_firm that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {default_spread_small_firmFindUniqueOrThrowArgs} args - Arguments to find a Default_spread_small_firm
     * @example
     * // Get one Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends default_spread_small_firmFindUniqueOrThrowArgs>(args: SelectSubset<T, default_spread_small_firmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Default_spread_small_firm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmFindFirstArgs} args - Arguments to find a Default_spread_small_firm
     * @example
     * // Get one Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends default_spread_small_firmFindFirstArgs>(args?: SelectSubset<T, default_spread_small_firmFindFirstArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Default_spread_small_firm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmFindFirstOrThrowArgs} args - Arguments to find a Default_spread_small_firm
     * @example
     * // Get one Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends default_spread_small_firmFindFirstOrThrowArgs>(args?: SelectSubset<T, default_spread_small_firmFindFirstOrThrowArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Default_spread_small_firms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Default_spread_small_firms
     * const default_spread_small_firms = await prisma.default_spread_small_firm.findMany()
     * 
     * // Get first 10 Default_spread_small_firms
     * const default_spread_small_firms = await prisma.default_spread_small_firm.findMany({ take: 10 })
     * 
     * // Only select the `min`
     * const default_spread_small_firmWithMinOnly = await prisma.default_spread_small_firm.findMany({ select: { min: true } })
     * 
     */
    findMany<T extends default_spread_small_firmFindManyArgs>(args?: SelectSubset<T, default_spread_small_firmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Default_spread_small_firm.
     * @param {default_spread_small_firmCreateArgs} args - Arguments to create a Default_spread_small_firm.
     * @example
     * // Create one Default_spread_small_firm
     * const Default_spread_small_firm = await prisma.default_spread_small_firm.create({
     *   data: {
     *     // ... data to create a Default_spread_small_firm
     *   }
     * })
     * 
     */
    create<T extends default_spread_small_firmCreateArgs>(args: SelectSubset<T, default_spread_small_firmCreateArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Default_spread_small_firms.
     * @param {default_spread_small_firmCreateManyArgs} args - Arguments to create many Default_spread_small_firms.
     * @example
     * // Create many Default_spread_small_firms
     * const default_spread_small_firm = await prisma.default_spread_small_firm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends default_spread_small_firmCreateManyArgs>(args?: SelectSubset<T, default_spread_small_firmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Default_spread_small_firms and returns the data saved in the database.
     * @param {default_spread_small_firmCreateManyAndReturnArgs} args - Arguments to create many Default_spread_small_firms.
     * @example
     * // Create many Default_spread_small_firms
     * const default_spread_small_firm = await prisma.default_spread_small_firm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Default_spread_small_firms and only return the `min`
     * const default_spread_small_firmWithMinOnly = await prisma.default_spread_small_firm.createManyAndReturn({ 
     *   select: { min: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends default_spread_small_firmCreateManyAndReturnArgs>(args?: SelectSubset<T, default_spread_small_firmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Default_spread_small_firm.
     * @param {default_spread_small_firmDeleteArgs} args - Arguments to delete one Default_spread_small_firm.
     * @example
     * // Delete one Default_spread_small_firm
     * const Default_spread_small_firm = await prisma.default_spread_small_firm.delete({
     *   where: {
     *     // ... filter to delete one Default_spread_small_firm
     *   }
     * })
     * 
     */
    delete<T extends default_spread_small_firmDeleteArgs>(args: SelectSubset<T, default_spread_small_firmDeleteArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Default_spread_small_firm.
     * @param {default_spread_small_firmUpdateArgs} args - Arguments to update one Default_spread_small_firm.
     * @example
     * // Update one Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends default_spread_small_firmUpdateArgs>(args: SelectSubset<T, default_spread_small_firmUpdateArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Default_spread_small_firms.
     * @param {default_spread_small_firmDeleteManyArgs} args - Arguments to filter Default_spread_small_firms to delete.
     * @example
     * // Delete a few Default_spread_small_firms
     * const { count } = await prisma.default_spread_small_firm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends default_spread_small_firmDeleteManyArgs>(args?: SelectSubset<T, default_spread_small_firmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Default_spread_small_firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Default_spread_small_firms
     * const default_spread_small_firm = await prisma.default_spread_small_firm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends default_spread_small_firmUpdateManyArgs>(args: SelectSubset<T, default_spread_small_firmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Default_spread_small_firm.
     * @param {default_spread_small_firmUpsertArgs} args - Arguments to update or create a Default_spread_small_firm.
     * @example
     * // Update or create a Default_spread_small_firm
     * const default_spread_small_firm = await prisma.default_spread_small_firm.upsert({
     *   create: {
     *     // ... data to create a Default_spread_small_firm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Default_spread_small_firm we want to update
     *   }
     * })
     */
    upsert<T extends default_spread_small_firmUpsertArgs>(args: SelectSubset<T, default_spread_small_firmUpsertArgs<ExtArgs>>): Prisma__default_spread_small_firmClient<$Result.GetResult<Prisma.$default_spread_small_firmPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Default_spread_small_firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmCountArgs} args - Arguments to filter Default_spread_small_firms to count.
     * @example
     * // Count the number of Default_spread_small_firms
     * const count = await prisma.default_spread_small_firm.count({
     *   where: {
     *     // ... the filter for the Default_spread_small_firms we want to count
     *   }
     * })
    **/
    count<T extends default_spread_small_firmCountArgs>(
      args?: Subset<T, default_spread_small_firmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Default_spread_small_firmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Default_spread_small_firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Default_spread_small_firmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Default_spread_small_firmAggregateArgs>(args: Subset<T, Default_spread_small_firmAggregateArgs>): Prisma.PrismaPromise<GetDefault_spread_small_firmAggregateType<T>>

    /**
     * Group by Default_spread_small_firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {default_spread_small_firmGroupByArgs} args - Group by arguments.
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
      T extends default_spread_small_firmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: default_spread_small_firmGroupByArgs['orderBy'] }
        : { orderBy?: default_spread_small_firmGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, default_spread_small_firmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDefault_spread_small_firmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the default_spread_small_firm model
   */
  readonly fields: default_spread_small_firmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for default_spread_small_firm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__default_spread_small_firmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the default_spread_small_firm model
   */ 
  interface default_spread_small_firmFieldRefs {
    readonly min: FieldRef<"default_spread_small_firm", 'String'>
    readonly max: FieldRef<"default_spread_small_firm", 'String'>
    readonly rating: FieldRef<"default_spread_small_firm", 'String'>
    readonly spread: FieldRef<"default_spread_small_firm", 'String'>
  }
    

  // Custom InputTypes
  /**
   * default_spread_small_firm findUnique
   */
  export type default_spread_small_firmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_small_firm to fetch.
     */
    where: default_spread_small_firmWhereUniqueInput
  }

  /**
   * default_spread_small_firm findUniqueOrThrow
   */
  export type default_spread_small_firmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_small_firm to fetch.
     */
    where: default_spread_small_firmWhereUniqueInput
  }

  /**
   * default_spread_small_firm findFirst
   */
  export type default_spread_small_firmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_small_firm to fetch.
     */
    where?: default_spread_small_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_small_firms to fetch.
     */
    orderBy?: default_spread_small_firmOrderByWithRelationInput | default_spread_small_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for default_spread_small_firms.
     */
    cursor?: default_spread_small_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_small_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_small_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of default_spread_small_firms.
     */
    distinct?: Default_spread_small_firmScalarFieldEnum | Default_spread_small_firmScalarFieldEnum[]
  }

  /**
   * default_spread_small_firm findFirstOrThrow
   */
  export type default_spread_small_firmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_small_firm to fetch.
     */
    where?: default_spread_small_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_small_firms to fetch.
     */
    orderBy?: default_spread_small_firmOrderByWithRelationInput | default_spread_small_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for default_spread_small_firms.
     */
    cursor?: default_spread_small_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_small_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_small_firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of default_spread_small_firms.
     */
    distinct?: Default_spread_small_firmScalarFieldEnum | Default_spread_small_firmScalarFieldEnum[]
  }

  /**
   * default_spread_small_firm findMany
   */
  export type default_spread_small_firmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter, which default_spread_small_firms to fetch.
     */
    where?: default_spread_small_firmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of default_spread_small_firms to fetch.
     */
    orderBy?: default_spread_small_firmOrderByWithRelationInput | default_spread_small_firmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing default_spread_small_firms.
     */
    cursor?: default_spread_small_firmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` default_spread_small_firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` default_spread_small_firms.
     */
    skip?: number
    distinct?: Default_spread_small_firmScalarFieldEnum | Default_spread_small_firmScalarFieldEnum[]
  }

  /**
   * default_spread_small_firm create
   */
  export type default_spread_small_firmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * The data needed to create a default_spread_small_firm.
     */
    data: XOR<default_spread_small_firmCreateInput, default_spread_small_firmUncheckedCreateInput>
  }

  /**
   * default_spread_small_firm createMany
   */
  export type default_spread_small_firmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many default_spread_small_firms.
     */
    data: default_spread_small_firmCreateManyInput | default_spread_small_firmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * default_spread_small_firm createManyAndReturn
   */
  export type default_spread_small_firmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many default_spread_small_firms.
     */
    data: default_spread_small_firmCreateManyInput | default_spread_small_firmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * default_spread_small_firm update
   */
  export type default_spread_small_firmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * The data needed to update a default_spread_small_firm.
     */
    data: XOR<default_spread_small_firmUpdateInput, default_spread_small_firmUncheckedUpdateInput>
    /**
     * Choose, which default_spread_small_firm to update.
     */
    where: default_spread_small_firmWhereUniqueInput
  }

  /**
   * default_spread_small_firm updateMany
   */
  export type default_spread_small_firmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update default_spread_small_firms.
     */
    data: XOR<default_spread_small_firmUpdateManyMutationInput, default_spread_small_firmUncheckedUpdateManyInput>
    /**
     * Filter which default_spread_small_firms to update
     */
    where?: default_spread_small_firmWhereInput
  }

  /**
   * default_spread_small_firm upsert
   */
  export type default_spread_small_firmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * The filter to search for the default_spread_small_firm to update in case it exists.
     */
    where: default_spread_small_firmWhereUniqueInput
    /**
     * In case the default_spread_small_firm found by the `where` argument doesn't exist, create a new default_spread_small_firm with this data.
     */
    create: XOR<default_spread_small_firmCreateInput, default_spread_small_firmUncheckedCreateInput>
    /**
     * In case the default_spread_small_firm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<default_spread_small_firmUpdateInput, default_spread_small_firmUncheckedUpdateInput>
  }

  /**
   * default_spread_small_firm delete
   */
  export type default_spread_small_firmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
    /**
     * Filter which default_spread_small_firm to delete.
     */
    where: default_spread_small_firmWhereUniqueInput
  }

  /**
   * default_spread_small_firm deleteMany
   */
  export type default_spread_small_firmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which default_spread_small_firms to delete
     */
    where?: default_spread_small_firmWhereInput
  }

  /**
   * default_spread_small_firm without action
   */
  export type default_spread_small_firmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the default_spread_small_firm
     */
    select?: default_spread_small_firmSelect<ExtArgs> | null
  }


  /**
   * Model input_stats
   */

  export type AggregateInput_stats = {
    _count: Input_statsCountAggregateOutputType | null
    _avg: Input_statsAvgAggregateOutputType | null
    _sum: Input_statsSumAggregateOutputType | null
    _min: Input_statsMinAggregateOutputType | null
    _max: Input_statsMaxAggregateOutputType | null
  }

  export type Input_statsAvgAggregateOutputType = {
    count: number | null
    revenue_growth_rate_first_quartile: number | null
    revenue_growth_rate_median: number | null
    revenue_growth_rate_third_quartile: number | null
    pre_tax_operating_margin_first_quartile: number | null
    pre_tax_operating_margin_median: number | null
    pre_tax_operating_margin_third_quartile: number | null
    sales_to_invested_capital_first_quartile: number | null
    sales_to_invested_capital_median: number | null
    sales_to_invested_capital_third_quartile: number | null
    cost_of_capital_first_quartile: number | null
    cost_of_capital_median: number | null
    cost_of_capital_third_quartile: number | null
    beta_first_quartile: number | null
    beta_median: number | null
    beta_third_quartile: number | null
    debt_to_capital_ratio_first_quartile: number | null
    debt_to_capital_ratio_median: number | null
    debt_to_capital_ratio_third_quartile: number | null
  }

  export type Input_statsSumAggregateOutputType = {
    count: number | null
    revenue_growth_rate_first_quartile: number | null
    revenue_growth_rate_median: number | null
    revenue_growth_rate_third_quartile: number | null
    pre_tax_operating_margin_first_quartile: number | null
    pre_tax_operating_margin_median: number | null
    pre_tax_operating_margin_third_quartile: number | null
    sales_to_invested_capital_first_quartile: number | null
    sales_to_invested_capital_median: number | null
    sales_to_invested_capital_third_quartile: number | null
    cost_of_capital_first_quartile: number | null
    cost_of_capital_median: number | null
    cost_of_capital_third_quartile: number | null
    beta_first_quartile: number | null
    beta_median: number | null
    beta_third_quartile: number | null
    debt_to_capital_ratio_first_quartile: number | null
    debt_to_capital_ratio_median: number | null
    debt_to_capital_ratio_third_quartile: number | null
  }

  export type Input_statsMinAggregateOutputType = {
    industry: string | null
    count: number | null
    revenue_growth_rate_first_quartile: number | null
    revenue_growth_rate_median: number | null
    revenue_growth_rate_third_quartile: number | null
    pre_tax_operating_margin_first_quartile: number | null
    pre_tax_operating_margin_median: number | null
    pre_tax_operating_margin_third_quartile: number | null
    sales_to_invested_capital_first_quartile: number | null
    sales_to_invested_capital_median: number | null
    sales_to_invested_capital_third_quartile: number | null
    cost_of_capital_first_quartile: number | null
    cost_of_capital_median: number | null
    cost_of_capital_third_quartile: number | null
    beta_first_quartile: number | null
    beta_median: number | null
    beta_third_quartile: number | null
    debt_to_capital_ratio_first_quartile: number | null
    debt_to_capital_ratio_median: number | null
    debt_to_capital_ratio_third_quartile: number | null
  }

  export type Input_statsMaxAggregateOutputType = {
    industry: string | null
    count: number | null
    revenue_growth_rate_first_quartile: number | null
    revenue_growth_rate_median: number | null
    revenue_growth_rate_third_quartile: number | null
    pre_tax_operating_margin_first_quartile: number | null
    pre_tax_operating_margin_median: number | null
    pre_tax_operating_margin_third_quartile: number | null
    sales_to_invested_capital_first_quartile: number | null
    sales_to_invested_capital_median: number | null
    sales_to_invested_capital_third_quartile: number | null
    cost_of_capital_first_quartile: number | null
    cost_of_capital_median: number | null
    cost_of_capital_third_quartile: number | null
    beta_first_quartile: number | null
    beta_median: number | null
    beta_third_quartile: number | null
    debt_to_capital_ratio_first_quartile: number | null
    debt_to_capital_ratio_median: number | null
    debt_to_capital_ratio_third_quartile: number | null
  }

  export type Input_statsCountAggregateOutputType = {
    industry: number
    count: number
    revenue_growth_rate_first_quartile: number
    revenue_growth_rate_median: number
    revenue_growth_rate_third_quartile: number
    pre_tax_operating_margin_first_quartile: number
    pre_tax_operating_margin_median: number
    pre_tax_operating_margin_third_quartile: number
    sales_to_invested_capital_first_quartile: number
    sales_to_invested_capital_median: number
    sales_to_invested_capital_third_quartile: number
    cost_of_capital_first_quartile: number
    cost_of_capital_median: number
    cost_of_capital_third_quartile: number
    beta_first_quartile: number
    beta_median: number
    beta_third_quartile: number
    debt_to_capital_ratio_first_quartile: number
    debt_to_capital_ratio_median: number
    debt_to_capital_ratio_third_quartile: number
    _all: number
  }


  export type Input_statsAvgAggregateInputType = {
    count?: true
    revenue_growth_rate_first_quartile?: true
    revenue_growth_rate_median?: true
    revenue_growth_rate_third_quartile?: true
    pre_tax_operating_margin_first_quartile?: true
    pre_tax_operating_margin_median?: true
    pre_tax_operating_margin_third_quartile?: true
    sales_to_invested_capital_first_quartile?: true
    sales_to_invested_capital_median?: true
    sales_to_invested_capital_third_quartile?: true
    cost_of_capital_first_quartile?: true
    cost_of_capital_median?: true
    cost_of_capital_third_quartile?: true
    beta_first_quartile?: true
    beta_median?: true
    beta_third_quartile?: true
    debt_to_capital_ratio_first_quartile?: true
    debt_to_capital_ratio_median?: true
    debt_to_capital_ratio_third_quartile?: true
  }

  export type Input_statsSumAggregateInputType = {
    count?: true
    revenue_growth_rate_first_quartile?: true
    revenue_growth_rate_median?: true
    revenue_growth_rate_third_quartile?: true
    pre_tax_operating_margin_first_quartile?: true
    pre_tax_operating_margin_median?: true
    pre_tax_operating_margin_third_quartile?: true
    sales_to_invested_capital_first_quartile?: true
    sales_to_invested_capital_median?: true
    sales_to_invested_capital_third_quartile?: true
    cost_of_capital_first_quartile?: true
    cost_of_capital_median?: true
    cost_of_capital_third_quartile?: true
    beta_first_quartile?: true
    beta_median?: true
    beta_third_quartile?: true
    debt_to_capital_ratio_first_quartile?: true
    debt_to_capital_ratio_median?: true
    debt_to_capital_ratio_third_quartile?: true
  }

  export type Input_statsMinAggregateInputType = {
    industry?: true
    count?: true
    revenue_growth_rate_first_quartile?: true
    revenue_growth_rate_median?: true
    revenue_growth_rate_third_quartile?: true
    pre_tax_operating_margin_first_quartile?: true
    pre_tax_operating_margin_median?: true
    pre_tax_operating_margin_third_quartile?: true
    sales_to_invested_capital_first_quartile?: true
    sales_to_invested_capital_median?: true
    sales_to_invested_capital_third_quartile?: true
    cost_of_capital_first_quartile?: true
    cost_of_capital_median?: true
    cost_of_capital_third_quartile?: true
    beta_first_quartile?: true
    beta_median?: true
    beta_third_quartile?: true
    debt_to_capital_ratio_first_quartile?: true
    debt_to_capital_ratio_median?: true
    debt_to_capital_ratio_third_quartile?: true
  }

  export type Input_statsMaxAggregateInputType = {
    industry?: true
    count?: true
    revenue_growth_rate_first_quartile?: true
    revenue_growth_rate_median?: true
    revenue_growth_rate_third_quartile?: true
    pre_tax_operating_margin_first_quartile?: true
    pre_tax_operating_margin_median?: true
    pre_tax_operating_margin_third_quartile?: true
    sales_to_invested_capital_first_quartile?: true
    sales_to_invested_capital_median?: true
    sales_to_invested_capital_third_quartile?: true
    cost_of_capital_first_quartile?: true
    cost_of_capital_median?: true
    cost_of_capital_third_quartile?: true
    beta_first_quartile?: true
    beta_median?: true
    beta_third_quartile?: true
    debt_to_capital_ratio_first_quartile?: true
    debt_to_capital_ratio_median?: true
    debt_to_capital_ratio_third_quartile?: true
  }

  export type Input_statsCountAggregateInputType = {
    industry?: true
    count?: true
    revenue_growth_rate_first_quartile?: true
    revenue_growth_rate_median?: true
    revenue_growth_rate_third_quartile?: true
    pre_tax_operating_margin_first_quartile?: true
    pre_tax_operating_margin_median?: true
    pre_tax_operating_margin_third_quartile?: true
    sales_to_invested_capital_first_quartile?: true
    sales_to_invested_capital_median?: true
    sales_to_invested_capital_third_quartile?: true
    cost_of_capital_first_quartile?: true
    cost_of_capital_median?: true
    cost_of_capital_third_quartile?: true
    beta_first_quartile?: true
    beta_median?: true
    beta_third_quartile?: true
    debt_to_capital_ratio_first_quartile?: true
    debt_to_capital_ratio_median?: true
    debt_to_capital_ratio_third_quartile?: true
    _all?: true
  }

  export type Input_statsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which input_stats to aggregate.
     */
    where?: input_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of input_stats to fetch.
     */
    orderBy?: input_statsOrderByWithRelationInput | input_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: input_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` input_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` input_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned input_stats
    **/
    _count?: true | Input_statsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Input_statsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Input_statsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Input_statsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Input_statsMaxAggregateInputType
  }

  export type GetInput_statsAggregateType<T extends Input_statsAggregateArgs> = {
        [P in keyof T & keyof AggregateInput_stats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInput_stats[P]>
      : GetScalarType<T[P], AggregateInput_stats[P]>
  }




  export type input_statsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: input_statsWhereInput
    orderBy?: input_statsOrderByWithAggregationInput | input_statsOrderByWithAggregationInput[]
    by: Input_statsScalarFieldEnum[] | Input_statsScalarFieldEnum
    having?: input_statsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Input_statsCountAggregateInputType | true
    _avg?: Input_statsAvgAggregateInputType
    _sum?: Input_statsSumAggregateInputType
    _min?: Input_statsMinAggregateInputType
    _max?: Input_statsMaxAggregateInputType
  }

  export type Input_statsGroupByOutputType = {
    industry: string
    count: number | null
    revenue_growth_rate_first_quartile: number | null
    revenue_growth_rate_median: number | null
    revenue_growth_rate_third_quartile: number | null
    pre_tax_operating_margin_first_quartile: number | null
    pre_tax_operating_margin_median: number | null
    pre_tax_operating_margin_third_quartile: number | null
    sales_to_invested_capital_first_quartile: number | null
    sales_to_invested_capital_median: number | null
    sales_to_invested_capital_third_quartile: number | null
    cost_of_capital_first_quartile: number | null
    cost_of_capital_median: number | null
    cost_of_capital_third_quartile: number | null
    beta_first_quartile: number | null
    beta_median: number | null
    beta_third_quartile: number | null
    debt_to_capital_ratio_first_quartile: number | null
    debt_to_capital_ratio_median: number | null
    debt_to_capital_ratio_third_quartile: number | null
    _count: Input_statsCountAggregateOutputType | null
    _avg: Input_statsAvgAggregateOutputType | null
    _sum: Input_statsSumAggregateOutputType | null
    _min: Input_statsMinAggregateOutputType | null
    _max: Input_statsMaxAggregateOutputType | null
  }

  type GetInput_statsGroupByPayload<T extends input_statsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Input_statsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Input_statsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Input_statsGroupByOutputType[P]>
            : GetScalarType<T[P], Input_statsGroupByOutputType[P]>
        }
      >
    >


  export type input_statsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    count?: boolean
    revenue_growth_rate_first_quartile?: boolean
    revenue_growth_rate_median?: boolean
    revenue_growth_rate_third_quartile?: boolean
    pre_tax_operating_margin_first_quartile?: boolean
    pre_tax_operating_margin_median?: boolean
    pre_tax_operating_margin_third_quartile?: boolean
    sales_to_invested_capital_first_quartile?: boolean
    sales_to_invested_capital_median?: boolean
    sales_to_invested_capital_third_quartile?: boolean
    cost_of_capital_first_quartile?: boolean
    cost_of_capital_median?: boolean
    cost_of_capital_third_quartile?: boolean
    beta_first_quartile?: boolean
    beta_median?: boolean
    beta_third_quartile?: boolean
    debt_to_capital_ratio_first_quartile?: boolean
    debt_to_capital_ratio_median?: boolean
    debt_to_capital_ratio_third_quartile?: boolean
  }, ExtArgs["result"]["input_stats"]>

  export type input_statsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry?: boolean
    count?: boolean
    revenue_growth_rate_first_quartile?: boolean
    revenue_growth_rate_median?: boolean
    revenue_growth_rate_third_quartile?: boolean
    pre_tax_operating_margin_first_quartile?: boolean
    pre_tax_operating_margin_median?: boolean
    pre_tax_operating_margin_third_quartile?: boolean
    sales_to_invested_capital_first_quartile?: boolean
    sales_to_invested_capital_median?: boolean
    sales_to_invested_capital_third_quartile?: boolean
    cost_of_capital_first_quartile?: boolean
    cost_of_capital_median?: boolean
    cost_of_capital_third_quartile?: boolean
    beta_first_quartile?: boolean
    beta_median?: boolean
    beta_third_quartile?: boolean
    debt_to_capital_ratio_first_quartile?: boolean
    debt_to_capital_ratio_median?: boolean
    debt_to_capital_ratio_third_quartile?: boolean
  }, ExtArgs["result"]["input_stats"]>

  export type input_statsSelectScalar = {
    industry?: boolean
    count?: boolean
    revenue_growth_rate_first_quartile?: boolean
    revenue_growth_rate_median?: boolean
    revenue_growth_rate_third_quartile?: boolean
    pre_tax_operating_margin_first_quartile?: boolean
    pre_tax_operating_margin_median?: boolean
    pre_tax_operating_margin_third_quartile?: boolean
    sales_to_invested_capital_first_quartile?: boolean
    sales_to_invested_capital_median?: boolean
    sales_to_invested_capital_third_quartile?: boolean
    cost_of_capital_first_quartile?: boolean
    cost_of_capital_median?: boolean
    cost_of_capital_third_quartile?: boolean
    beta_first_quartile?: boolean
    beta_median?: boolean
    beta_third_quartile?: boolean
    debt_to_capital_ratio_first_quartile?: boolean
    debt_to_capital_ratio_median?: boolean
    debt_to_capital_ratio_third_quartile?: boolean
  }


  export type $input_statsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "input_stats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      industry: string
      count: number | null
      revenue_growth_rate_first_quartile: number | null
      revenue_growth_rate_median: number | null
      revenue_growth_rate_third_quartile: number | null
      pre_tax_operating_margin_first_quartile: number | null
      pre_tax_operating_margin_median: number | null
      pre_tax_operating_margin_third_quartile: number | null
      sales_to_invested_capital_first_quartile: number | null
      sales_to_invested_capital_median: number | null
      sales_to_invested_capital_third_quartile: number | null
      cost_of_capital_first_quartile: number | null
      cost_of_capital_median: number | null
      cost_of_capital_third_quartile: number | null
      beta_first_quartile: number | null
      beta_median: number | null
      beta_third_quartile: number | null
      debt_to_capital_ratio_first_quartile: number | null
      debt_to_capital_ratio_median: number | null
      debt_to_capital_ratio_third_quartile: number | null
    }, ExtArgs["result"]["input_stats"]>
    composites: {}
  }

  type input_statsGetPayload<S extends boolean | null | undefined | input_statsDefaultArgs> = $Result.GetResult<Prisma.$input_statsPayload, S>

  type input_statsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<input_statsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Input_statsCountAggregateInputType | true
    }

  export interface input_statsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['input_stats'], meta: { name: 'input_stats' } }
    /**
     * Find zero or one Input_stats that matches the filter.
     * @param {input_statsFindUniqueArgs} args - Arguments to find a Input_stats
     * @example
     * // Get one Input_stats
     * const input_stats = await prisma.input_stats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends input_statsFindUniqueArgs>(args: SelectSubset<T, input_statsFindUniqueArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Input_stats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {input_statsFindUniqueOrThrowArgs} args - Arguments to find a Input_stats
     * @example
     * // Get one Input_stats
     * const input_stats = await prisma.input_stats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends input_statsFindUniqueOrThrowArgs>(args: SelectSubset<T, input_statsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Input_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsFindFirstArgs} args - Arguments to find a Input_stats
     * @example
     * // Get one Input_stats
     * const input_stats = await prisma.input_stats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends input_statsFindFirstArgs>(args?: SelectSubset<T, input_statsFindFirstArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Input_stats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsFindFirstOrThrowArgs} args - Arguments to find a Input_stats
     * @example
     * // Get one Input_stats
     * const input_stats = await prisma.input_stats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends input_statsFindFirstOrThrowArgs>(args?: SelectSubset<T, input_statsFindFirstOrThrowArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Input_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Input_stats
     * const input_stats = await prisma.input_stats.findMany()
     * 
     * // Get first 10 Input_stats
     * const input_stats = await prisma.input_stats.findMany({ take: 10 })
     * 
     * // Only select the `industry`
     * const input_statsWithIndustryOnly = await prisma.input_stats.findMany({ select: { industry: true } })
     * 
     */
    findMany<T extends input_statsFindManyArgs>(args?: SelectSubset<T, input_statsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Input_stats.
     * @param {input_statsCreateArgs} args - Arguments to create a Input_stats.
     * @example
     * // Create one Input_stats
     * const Input_stats = await prisma.input_stats.create({
     *   data: {
     *     // ... data to create a Input_stats
     *   }
     * })
     * 
     */
    create<T extends input_statsCreateArgs>(args: SelectSubset<T, input_statsCreateArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Input_stats.
     * @param {input_statsCreateManyArgs} args - Arguments to create many Input_stats.
     * @example
     * // Create many Input_stats
     * const input_stats = await prisma.input_stats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends input_statsCreateManyArgs>(args?: SelectSubset<T, input_statsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Input_stats and returns the data saved in the database.
     * @param {input_statsCreateManyAndReturnArgs} args - Arguments to create many Input_stats.
     * @example
     * // Create many Input_stats
     * const input_stats = await prisma.input_stats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Input_stats and only return the `industry`
     * const input_statsWithIndustryOnly = await prisma.input_stats.createManyAndReturn({ 
     *   select: { industry: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends input_statsCreateManyAndReturnArgs>(args?: SelectSubset<T, input_statsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Input_stats.
     * @param {input_statsDeleteArgs} args - Arguments to delete one Input_stats.
     * @example
     * // Delete one Input_stats
     * const Input_stats = await prisma.input_stats.delete({
     *   where: {
     *     // ... filter to delete one Input_stats
     *   }
     * })
     * 
     */
    delete<T extends input_statsDeleteArgs>(args: SelectSubset<T, input_statsDeleteArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Input_stats.
     * @param {input_statsUpdateArgs} args - Arguments to update one Input_stats.
     * @example
     * // Update one Input_stats
     * const input_stats = await prisma.input_stats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends input_statsUpdateArgs>(args: SelectSubset<T, input_statsUpdateArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Input_stats.
     * @param {input_statsDeleteManyArgs} args - Arguments to filter Input_stats to delete.
     * @example
     * // Delete a few Input_stats
     * const { count } = await prisma.input_stats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends input_statsDeleteManyArgs>(args?: SelectSubset<T, input_statsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Input_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Input_stats
     * const input_stats = await prisma.input_stats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends input_statsUpdateManyArgs>(args: SelectSubset<T, input_statsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Input_stats.
     * @param {input_statsUpsertArgs} args - Arguments to update or create a Input_stats.
     * @example
     * // Update or create a Input_stats
     * const input_stats = await prisma.input_stats.upsert({
     *   create: {
     *     // ... data to create a Input_stats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Input_stats we want to update
     *   }
     * })
     */
    upsert<T extends input_statsUpsertArgs>(args: SelectSubset<T, input_statsUpsertArgs<ExtArgs>>): Prisma__input_statsClient<$Result.GetResult<Prisma.$input_statsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Input_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsCountArgs} args - Arguments to filter Input_stats to count.
     * @example
     * // Count the number of Input_stats
     * const count = await prisma.input_stats.count({
     *   where: {
     *     // ... the filter for the Input_stats we want to count
     *   }
     * })
    **/
    count<T extends input_statsCountArgs>(
      args?: Subset<T, input_statsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Input_statsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Input_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Input_statsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Input_statsAggregateArgs>(args: Subset<T, Input_statsAggregateArgs>): Prisma.PrismaPromise<GetInput_statsAggregateType<T>>

    /**
     * Group by Input_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {input_statsGroupByArgs} args - Group by arguments.
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
      T extends input_statsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: input_statsGroupByArgs['orderBy'] }
        : { orderBy?: input_statsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, input_statsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInput_statsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the input_stats model
   */
  readonly fields: input_statsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for input_stats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__input_statsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the input_stats model
   */ 
  interface input_statsFieldRefs {
    readonly industry: FieldRef<"input_stats", 'String'>
    readonly count: FieldRef<"input_stats", 'Int'>
    readonly revenue_growth_rate_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly revenue_growth_rate_median: FieldRef<"input_stats", 'Float'>
    readonly revenue_growth_rate_third_quartile: FieldRef<"input_stats", 'Float'>
    readonly pre_tax_operating_margin_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly pre_tax_operating_margin_median: FieldRef<"input_stats", 'Float'>
    readonly pre_tax_operating_margin_third_quartile: FieldRef<"input_stats", 'Float'>
    readonly sales_to_invested_capital_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly sales_to_invested_capital_median: FieldRef<"input_stats", 'Float'>
    readonly sales_to_invested_capital_third_quartile: FieldRef<"input_stats", 'Float'>
    readonly cost_of_capital_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly cost_of_capital_median: FieldRef<"input_stats", 'Float'>
    readonly cost_of_capital_third_quartile: FieldRef<"input_stats", 'Float'>
    readonly beta_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly beta_median: FieldRef<"input_stats", 'Float'>
    readonly beta_third_quartile: FieldRef<"input_stats", 'Float'>
    readonly debt_to_capital_ratio_first_quartile: FieldRef<"input_stats", 'Float'>
    readonly debt_to_capital_ratio_median: FieldRef<"input_stats", 'Float'>
    readonly debt_to_capital_ratio_third_quartile: FieldRef<"input_stats", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * input_stats findUnique
   */
  export type input_statsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter, which input_stats to fetch.
     */
    where: input_statsWhereUniqueInput
  }

  /**
   * input_stats findUniqueOrThrow
   */
  export type input_statsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter, which input_stats to fetch.
     */
    where: input_statsWhereUniqueInput
  }

  /**
   * input_stats findFirst
   */
  export type input_statsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter, which input_stats to fetch.
     */
    where?: input_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of input_stats to fetch.
     */
    orderBy?: input_statsOrderByWithRelationInput | input_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for input_stats.
     */
    cursor?: input_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` input_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` input_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of input_stats.
     */
    distinct?: Input_statsScalarFieldEnum | Input_statsScalarFieldEnum[]
  }

  /**
   * input_stats findFirstOrThrow
   */
  export type input_statsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter, which input_stats to fetch.
     */
    where?: input_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of input_stats to fetch.
     */
    orderBy?: input_statsOrderByWithRelationInput | input_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for input_stats.
     */
    cursor?: input_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` input_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` input_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of input_stats.
     */
    distinct?: Input_statsScalarFieldEnum | Input_statsScalarFieldEnum[]
  }

  /**
   * input_stats findMany
   */
  export type input_statsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter, which input_stats to fetch.
     */
    where?: input_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of input_stats to fetch.
     */
    orderBy?: input_statsOrderByWithRelationInput | input_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing input_stats.
     */
    cursor?: input_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` input_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` input_stats.
     */
    skip?: number
    distinct?: Input_statsScalarFieldEnum | Input_statsScalarFieldEnum[]
  }

  /**
   * input_stats create
   */
  export type input_statsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * The data needed to create a input_stats.
     */
    data: XOR<input_statsCreateInput, input_statsUncheckedCreateInput>
  }

  /**
   * input_stats createMany
   */
  export type input_statsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many input_stats.
     */
    data: input_statsCreateManyInput | input_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * input_stats createManyAndReturn
   */
  export type input_statsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many input_stats.
     */
    data: input_statsCreateManyInput | input_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * input_stats update
   */
  export type input_statsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * The data needed to update a input_stats.
     */
    data: XOR<input_statsUpdateInput, input_statsUncheckedUpdateInput>
    /**
     * Choose, which input_stats to update.
     */
    where: input_statsWhereUniqueInput
  }

  /**
   * input_stats updateMany
   */
  export type input_statsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update input_stats.
     */
    data: XOR<input_statsUpdateManyMutationInput, input_statsUncheckedUpdateManyInput>
    /**
     * Filter which input_stats to update
     */
    where?: input_statsWhereInput
  }

  /**
   * input_stats upsert
   */
  export type input_statsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * The filter to search for the input_stats to update in case it exists.
     */
    where: input_statsWhereUniqueInput
    /**
     * In case the input_stats found by the `where` argument doesn't exist, create a new input_stats with this data.
     */
    create: XOR<input_statsCreateInput, input_statsUncheckedCreateInput>
    /**
     * In case the input_stats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<input_statsUpdateInput, input_statsUncheckedUpdateInput>
  }

  /**
   * input_stats delete
   */
  export type input_statsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
    /**
     * Filter which input_stats to delete.
     */
    where: input_statsWhereUniqueInput
  }

  /**
   * input_stats deleteMany
   */
  export type input_statsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which input_stats to delete
     */
    where?: input_statsWhereInput
  }

  /**
   * input_stats without action
   */
  export type input_statsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the input_stats
     */
    select?: input_statsSelect<ExtArgs> | null
  }


  /**
   * Model valuation
   */

  export type AggregateValuation = {
    _count: ValuationCountAggregateOutputType | null
    _avg: ValuationAvgAggregateOutputType | null
    _sum: ValuationSumAggregateOutputType | null
    _min: ValuationMinAggregateOutputType | null
    _max: ValuationMaxAggregateOutputType | null
  }

  export type ValuationAvgAggregateOutputType = {
    id: number | null
    implied_share_price: Decimal | null
    valued_date: number | null
  }

  export type ValuationSumAggregateOutputType = {
    id: number | null
    implied_share_price: Decimal | null
    valued_date: number | null
  }

  export type ValuationMinAggregateOutputType = {
    id: number | null
    symbol: string | null
    email: string | null
    implied_share_price: Decimal | null
    description: string | null
    valued_date: number | null
  }

  export type ValuationMaxAggregateOutputType = {
    id: number | null
    symbol: string | null
    email: string | null
    implied_share_price: Decimal | null
    description: string | null
    valued_date: number | null
  }

  export type ValuationCountAggregateOutputType = {
    id: number
    symbol: number
    email: number
    inputs: number
    fetched_inputs: number
    stock_info: number
    valuation_model: number
    valuation_output: number
    implied_share_price: number
    description: number
    valued_date: number
    _all: number
  }


  export type ValuationAvgAggregateInputType = {
    id?: true
    implied_share_price?: true
    valued_date?: true
  }

  export type ValuationSumAggregateInputType = {
    id?: true
    implied_share_price?: true
    valued_date?: true
  }

  export type ValuationMinAggregateInputType = {
    id?: true
    symbol?: true
    email?: true
    implied_share_price?: true
    description?: true
    valued_date?: true
  }

  export type ValuationMaxAggregateInputType = {
    id?: true
    symbol?: true
    email?: true
    implied_share_price?: true
    description?: true
    valued_date?: true
  }

  export type ValuationCountAggregateInputType = {
    id?: true
    symbol?: true
    email?: true
    inputs?: true
    fetched_inputs?: true
    stock_info?: true
    valuation_model?: true
    valuation_output?: true
    implied_share_price?: true
    description?: true
    valued_date?: true
    _all?: true
  }

  export type ValuationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which valuation to aggregate.
     */
    where?: valuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of valuations to fetch.
     */
    orderBy?: valuationOrderByWithRelationInput | valuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: valuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` valuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` valuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned valuations
    **/
    _count?: true | ValuationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ValuationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ValuationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ValuationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ValuationMaxAggregateInputType
  }

  export type GetValuationAggregateType<T extends ValuationAggregateArgs> = {
        [P in keyof T & keyof AggregateValuation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateValuation[P]>
      : GetScalarType<T[P], AggregateValuation[P]>
  }




  export type valuationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: valuationWhereInput
    orderBy?: valuationOrderByWithAggregationInput | valuationOrderByWithAggregationInput[]
    by: ValuationScalarFieldEnum[] | ValuationScalarFieldEnum
    having?: valuationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ValuationCountAggregateInputType | true
    _avg?: ValuationAvgAggregateInputType
    _sum?: ValuationSumAggregateInputType
    _min?: ValuationMinAggregateInputType
    _max?: ValuationMaxAggregateInputType
  }

  export type ValuationGroupByOutputType = {
    id: number
    symbol: string | null
    email: string | null
    inputs: JsonValue | null
    fetched_inputs: JsonValue | null
    stock_info: JsonValue | null
    valuation_model: JsonValue | null
    valuation_output: JsonValue | null
    implied_share_price: Decimal | null
    description: string | null
    valued_date: number | null
    _count: ValuationCountAggregateOutputType | null
    _avg: ValuationAvgAggregateOutputType | null
    _sum: ValuationSumAggregateOutputType | null
    _min: ValuationMinAggregateOutputType | null
    _max: ValuationMaxAggregateOutputType | null
  }

  type GetValuationGroupByPayload<T extends valuationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ValuationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ValuationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ValuationGroupByOutputType[P]>
            : GetScalarType<T[P], ValuationGroupByOutputType[P]>
        }
      >
    >


  export type valuationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    email?: boolean
    inputs?: boolean
    fetched_inputs?: boolean
    stock_info?: boolean
    valuation_model?: boolean
    valuation_output?: boolean
    implied_share_price?: boolean
    description?: boolean
    valued_date?: boolean
  }, ExtArgs["result"]["valuation"]>

  export type valuationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    email?: boolean
    inputs?: boolean
    fetched_inputs?: boolean
    stock_info?: boolean
    valuation_model?: boolean
    valuation_output?: boolean
    implied_share_price?: boolean
    description?: boolean
    valued_date?: boolean
  }, ExtArgs["result"]["valuation"]>

  export type valuationSelectScalar = {
    id?: boolean
    symbol?: boolean
    email?: boolean
    inputs?: boolean
    fetched_inputs?: boolean
    stock_info?: boolean
    valuation_model?: boolean
    valuation_output?: boolean
    implied_share_price?: boolean
    description?: boolean
    valued_date?: boolean
  }


  export type $valuationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "valuation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      symbol: string | null
      email: string | null
      inputs: Prisma.JsonValue | null
      fetched_inputs: Prisma.JsonValue | null
      stock_info: Prisma.JsonValue | null
      valuation_model: Prisma.JsonValue | null
      valuation_output: Prisma.JsonValue | null
      implied_share_price: Prisma.Decimal | null
      description: string | null
      valued_date: number | null
    }, ExtArgs["result"]["valuation"]>
    composites: {}
  }

  type valuationGetPayload<S extends boolean | null | undefined | valuationDefaultArgs> = $Result.GetResult<Prisma.$valuationPayload, S>

  type valuationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<valuationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ValuationCountAggregateInputType | true
    }

  export interface valuationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['valuation'], meta: { name: 'valuation' } }
    /**
     * Find zero or one Valuation that matches the filter.
     * @param {valuationFindUniqueArgs} args - Arguments to find a Valuation
     * @example
     * // Get one Valuation
     * const valuation = await prisma.valuation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends valuationFindUniqueArgs>(args: SelectSubset<T, valuationFindUniqueArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Valuation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {valuationFindUniqueOrThrowArgs} args - Arguments to find a Valuation
     * @example
     * // Get one Valuation
     * const valuation = await prisma.valuation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends valuationFindUniqueOrThrowArgs>(args: SelectSubset<T, valuationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Valuation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationFindFirstArgs} args - Arguments to find a Valuation
     * @example
     * // Get one Valuation
     * const valuation = await prisma.valuation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends valuationFindFirstArgs>(args?: SelectSubset<T, valuationFindFirstArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Valuation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationFindFirstOrThrowArgs} args - Arguments to find a Valuation
     * @example
     * // Get one Valuation
     * const valuation = await prisma.valuation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends valuationFindFirstOrThrowArgs>(args?: SelectSubset<T, valuationFindFirstOrThrowArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Valuations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Valuations
     * const valuations = await prisma.valuation.findMany()
     * 
     * // Get first 10 Valuations
     * const valuations = await prisma.valuation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const valuationWithIdOnly = await prisma.valuation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends valuationFindManyArgs>(args?: SelectSubset<T, valuationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Valuation.
     * @param {valuationCreateArgs} args - Arguments to create a Valuation.
     * @example
     * // Create one Valuation
     * const Valuation = await prisma.valuation.create({
     *   data: {
     *     // ... data to create a Valuation
     *   }
     * })
     * 
     */
    create<T extends valuationCreateArgs>(args: SelectSubset<T, valuationCreateArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Valuations.
     * @param {valuationCreateManyArgs} args - Arguments to create many Valuations.
     * @example
     * // Create many Valuations
     * const valuation = await prisma.valuation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends valuationCreateManyArgs>(args?: SelectSubset<T, valuationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Valuations and returns the data saved in the database.
     * @param {valuationCreateManyAndReturnArgs} args - Arguments to create many Valuations.
     * @example
     * // Create many Valuations
     * const valuation = await prisma.valuation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Valuations and only return the `id`
     * const valuationWithIdOnly = await prisma.valuation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends valuationCreateManyAndReturnArgs>(args?: SelectSubset<T, valuationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Valuation.
     * @param {valuationDeleteArgs} args - Arguments to delete one Valuation.
     * @example
     * // Delete one Valuation
     * const Valuation = await prisma.valuation.delete({
     *   where: {
     *     // ... filter to delete one Valuation
     *   }
     * })
     * 
     */
    delete<T extends valuationDeleteArgs>(args: SelectSubset<T, valuationDeleteArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Valuation.
     * @param {valuationUpdateArgs} args - Arguments to update one Valuation.
     * @example
     * // Update one Valuation
     * const valuation = await prisma.valuation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends valuationUpdateArgs>(args: SelectSubset<T, valuationUpdateArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Valuations.
     * @param {valuationDeleteManyArgs} args - Arguments to filter Valuations to delete.
     * @example
     * // Delete a few Valuations
     * const { count } = await prisma.valuation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends valuationDeleteManyArgs>(args?: SelectSubset<T, valuationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Valuations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Valuations
     * const valuation = await prisma.valuation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends valuationUpdateManyArgs>(args: SelectSubset<T, valuationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Valuation.
     * @param {valuationUpsertArgs} args - Arguments to update or create a Valuation.
     * @example
     * // Update or create a Valuation
     * const valuation = await prisma.valuation.upsert({
     *   create: {
     *     // ... data to create a Valuation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Valuation we want to update
     *   }
     * })
     */
    upsert<T extends valuationUpsertArgs>(args: SelectSubset<T, valuationUpsertArgs<ExtArgs>>): Prisma__valuationClient<$Result.GetResult<Prisma.$valuationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Valuations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationCountArgs} args - Arguments to filter Valuations to count.
     * @example
     * // Count the number of Valuations
     * const count = await prisma.valuation.count({
     *   where: {
     *     // ... the filter for the Valuations we want to count
     *   }
     * })
    **/
    count<T extends valuationCountArgs>(
      args?: Subset<T, valuationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ValuationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Valuation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ValuationAggregateArgs>(args: Subset<T, ValuationAggregateArgs>): Prisma.PrismaPromise<GetValuationAggregateType<T>>

    /**
     * Group by Valuation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {valuationGroupByArgs} args - Group by arguments.
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
      T extends valuationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: valuationGroupByArgs['orderBy'] }
        : { orderBy?: valuationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, valuationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValuationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the valuation model
   */
  readonly fields: valuationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for valuation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__valuationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the valuation model
   */ 
  interface valuationFieldRefs {
    readonly id: FieldRef<"valuation", 'Int'>
    readonly symbol: FieldRef<"valuation", 'String'>
    readonly email: FieldRef<"valuation", 'String'>
    readonly inputs: FieldRef<"valuation", 'Json'>
    readonly fetched_inputs: FieldRef<"valuation", 'Json'>
    readonly stock_info: FieldRef<"valuation", 'Json'>
    readonly valuation_model: FieldRef<"valuation", 'Json'>
    readonly valuation_output: FieldRef<"valuation", 'Json'>
    readonly implied_share_price: FieldRef<"valuation", 'Decimal'>
    readonly description: FieldRef<"valuation", 'String'>
    readonly valued_date: FieldRef<"valuation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * valuation findUnique
   */
  export type valuationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter, which valuation to fetch.
     */
    where: valuationWhereUniqueInput
  }

  /**
   * valuation findUniqueOrThrow
   */
  export type valuationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter, which valuation to fetch.
     */
    where: valuationWhereUniqueInput
  }

  /**
   * valuation findFirst
   */
  export type valuationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter, which valuation to fetch.
     */
    where?: valuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of valuations to fetch.
     */
    orderBy?: valuationOrderByWithRelationInput | valuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for valuations.
     */
    cursor?: valuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` valuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` valuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of valuations.
     */
    distinct?: ValuationScalarFieldEnum | ValuationScalarFieldEnum[]
  }

  /**
   * valuation findFirstOrThrow
   */
  export type valuationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter, which valuation to fetch.
     */
    where?: valuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of valuations to fetch.
     */
    orderBy?: valuationOrderByWithRelationInput | valuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for valuations.
     */
    cursor?: valuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` valuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` valuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of valuations.
     */
    distinct?: ValuationScalarFieldEnum | ValuationScalarFieldEnum[]
  }

  /**
   * valuation findMany
   */
  export type valuationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter, which valuations to fetch.
     */
    where?: valuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of valuations to fetch.
     */
    orderBy?: valuationOrderByWithRelationInput | valuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing valuations.
     */
    cursor?: valuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` valuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` valuations.
     */
    skip?: number
    distinct?: ValuationScalarFieldEnum | ValuationScalarFieldEnum[]
  }

  /**
   * valuation create
   */
  export type valuationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * The data needed to create a valuation.
     */
    data?: XOR<valuationCreateInput, valuationUncheckedCreateInput>
  }

  /**
   * valuation createMany
   */
  export type valuationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many valuations.
     */
    data: valuationCreateManyInput | valuationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * valuation createManyAndReturn
   */
  export type valuationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many valuations.
     */
    data: valuationCreateManyInput | valuationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * valuation update
   */
  export type valuationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * The data needed to update a valuation.
     */
    data: XOR<valuationUpdateInput, valuationUncheckedUpdateInput>
    /**
     * Choose, which valuation to update.
     */
    where: valuationWhereUniqueInput
  }

  /**
   * valuation updateMany
   */
  export type valuationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update valuations.
     */
    data: XOR<valuationUpdateManyMutationInput, valuationUncheckedUpdateManyInput>
    /**
     * Filter which valuations to update
     */
    where?: valuationWhereInput
  }

  /**
   * valuation upsert
   */
  export type valuationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * The filter to search for the valuation to update in case it exists.
     */
    where: valuationWhereUniqueInput
    /**
     * In case the valuation found by the `where` argument doesn't exist, create a new valuation with this data.
     */
    create: XOR<valuationCreateInput, valuationUncheckedCreateInput>
    /**
     * In case the valuation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<valuationUpdateInput, valuationUncheckedUpdateInput>
  }

  /**
   * valuation delete
   */
  export type valuationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
    /**
     * Filter which valuation to delete.
     */
    where: valuationWhereUniqueInput
  }

  /**
   * valuation deleteMany
   */
  export type valuationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which valuations to delete
     */
    where?: valuationWhereInput
  }

  /**
   * valuation without action
   */
  export type valuationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the valuation
     */
    select?: valuationSelect<ExtArgs> | null
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


  export const Beta_usScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    avg_unlevered_beta: 'avg_unlevered_beta',
    avg_levered_beta: 'avg_levered_beta',
    avg_correlation_with_mkt: 'avg_correlation_with_mkt',
    total_unlevered_beta: 'total_unlevered_beta',
    total_levered_beta: 'total_levered_beta'
  };

  export type Beta_usScalarFieldEnum = (typeof Beta_usScalarFieldEnum)[keyof typeof Beta_usScalarFieldEnum]


  export const Country_risk_premiumScalarFieldEnum: {
    country: 'country',
    adj_default_spread: 'adj_default_spread',
    equity_risk_premium: 'equity_risk_premium',
    country_risk_premium: 'country_risk_premium',
    corporate_tax_rate: 'corporate_tax_rate',
    moody_rating: 'moody_rating',
    soverign_cds_spread: 'soverign_cds_spread'
  };

  export type Country_risk_premiumScalarFieldEnum = (typeof Country_risk_premiumScalarFieldEnum)[keyof typeof Country_risk_premiumScalarFieldEnum]


  export const Data_last_updateScalarFieldEnum: {
    data_name: 'data_name',
    last_update: 'last_update'
  };

  export type Data_last_updateScalarFieldEnum = (typeof Data_last_updateScalarFieldEnum)[keyof typeof Data_last_updateScalarFieldEnum]


  export const Ebit_growthScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    roc: 'roc',
    reinvestment_rate: 'reinvestment_rate',
    expected_growth_ebit: 'expected_growth_ebit'
  };

  export type Ebit_growthScalarFieldEnum = (typeof Ebit_growthScalarFieldEnum)[keyof typeof Ebit_growthScalarFieldEnum]


  export const Pe_ratio_usScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    perc_money_losing_firms_trailing: 'perc_money_losing_firms_trailing',
    current_pe: 'current_pe',
    trailing_pe: 'trailing_pe',
    forward_pe: 'forward_pe',
    agg_mkt_cap_net_income: 'agg_mkt_cap_net_income',
    agg_mkt_cap_trailing_net_income_money_making_firms: 'agg_mkt_cap_trailing_net_income_money_making_firms',
    expected_growth_next_5_yrs: 'expected_growth_next_5_yrs',
    peg_ratio: 'peg_ratio'
  };

  export type Pe_ratio_usScalarFieldEnum = (typeof Pe_ratio_usScalarFieldEnum)[keyof typeof Pe_ratio_usScalarFieldEnum]


  export const Rev_growth_rateScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    cagr_net_income_last_5_years: 'cagr_net_income_last_5_years',
    cagr_net_rev_last_5_years: 'cagr_net_rev_last_5_years',
    expected_growth_rev_next_2_years: 'expected_growth_rev_next_2_years',
    expected_growth_rev_next_5_years: 'expected_growth_rev_next_5_years',
    expected_growth_eps_next_5_years: 'expected_growth_eps_next_5_years'
  };

  export type Rev_growth_rateScalarFieldEnum = (typeof Rev_growth_rateScalarFieldEnum)[keyof typeof Rev_growth_rateScalarFieldEnum]


  export const Sales_to_cap_usScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    capex: 'capex',
    depre_amort: 'depre_amort',
    capex_depre: 'capex_depre',
    acquisitions: 'acquisitions',
    net_r_and_d: 'net_r_and_d',
    net_capex_sales: 'net_capex_sales',
    net_capex_ebit_aftertax: 'net_capex_ebit_aftertax',
    sales_invested_capital: 'sales_invested_capital'
  };

  export type Sales_to_cap_usScalarFieldEnum = (typeof Sales_to_cap_usScalarFieldEnum)[keyof typeof Sales_to_cap_usScalarFieldEnum]


  export const Effective_tax_rateScalarFieldEnum: {
    industry: 'industry',
    no_of_firms: 'no_of_firms',
    total_taxable_income: 'total_taxable_income',
    total_taxes_paid_accrual: 'total_taxes_paid_accrual',
    total_cash_taxes_paid: 'total_cash_taxes_paid',
    cash_taxes_accrual_taxes: 'cash_taxes_accrual_taxes',
    effectivetr_avg_across_all_comp: 'effectivetr_avg_across_all_comp',
    effectivetr_avg_across_money_making_comp: 'effectivetr_avg_across_money_making_comp',
    effectivetr_agg_tax_rate: 'effectivetr_agg_tax_rate',
    cashtr_avg_across_money_making_comp: 'cashtr_avg_across_money_making_comp',
    cashtr_agg_tax_rate: 'cashtr_agg_tax_rate'
  };

  export type Effective_tax_rateScalarFieldEnum = (typeof Effective_tax_rateScalarFieldEnum)[keyof typeof Effective_tax_rateScalarFieldEnum]


  export const Default_spread_large_firmScalarFieldEnum: {
    min: 'min',
    max: 'max',
    rating: 'rating',
    spread: 'spread'
  };

  export type Default_spread_large_firmScalarFieldEnum = (typeof Default_spread_large_firmScalarFieldEnum)[keyof typeof Default_spread_large_firmScalarFieldEnum]


  export const Default_spread_small_firmScalarFieldEnum: {
    min: 'min',
    max: 'max',
    rating: 'rating',
    spread: 'spread'
  };

  export type Default_spread_small_firmScalarFieldEnum = (typeof Default_spread_small_firmScalarFieldEnum)[keyof typeof Default_spread_small_firmScalarFieldEnum]


  export const Input_statsScalarFieldEnum: {
    industry: 'industry',
    count: 'count',
    revenue_growth_rate_first_quartile: 'revenue_growth_rate_first_quartile',
    revenue_growth_rate_median: 'revenue_growth_rate_median',
    revenue_growth_rate_third_quartile: 'revenue_growth_rate_third_quartile',
    pre_tax_operating_margin_first_quartile: 'pre_tax_operating_margin_first_quartile',
    pre_tax_operating_margin_median: 'pre_tax_operating_margin_median',
    pre_tax_operating_margin_third_quartile: 'pre_tax_operating_margin_third_quartile',
    sales_to_invested_capital_first_quartile: 'sales_to_invested_capital_first_quartile',
    sales_to_invested_capital_median: 'sales_to_invested_capital_median',
    sales_to_invested_capital_third_quartile: 'sales_to_invested_capital_third_quartile',
    cost_of_capital_first_quartile: 'cost_of_capital_first_quartile',
    cost_of_capital_median: 'cost_of_capital_median',
    cost_of_capital_third_quartile: 'cost_of_capital_third_quartile',
    beta_first_quartile: 'beta_first_quartile',
    beta_median: 'beta_median',
    beta_third_quartile: 'beta_third_quartile',
    debt_to_capital_ratio_first_quartile: 'debt_to_capital_ratio_first_quartile',
    debt_to_capital_ratio_median: 'debt_to_capital_ratio_median',
    debt_to_capital_ratio_third_quartile: 'debt_to_capital_ratio_third_quartile'
  };

  export type Input_statsScalarFieldEnum = (typeof Input_statsScalarFieldEnum)[keyof typeof Input_statsScalarFieldEnum]


  export const ValuationScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    email: 'email',
    inputs: 'inputs',
    fetched_inputs: 'fetched_inputs',
    stock_info: 'stock_info',
    valuation_model: 'valuation_model',
    valuation_output: 'valuation_output',
    implied_share_price: 'implied_share_price',
    description: 'description',
    valued_date: 'valued_date'
  };

  export type ValuationScalarFieldEnum = (typeof ValuationScalarFieldEnum)[keyof typeof ValuationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type beta_usWhereInput = {
    AND?: beta_usWhereInput | beta_usWhereInput[]
    OR?: beta_usWhereInput[]
    NOT?: beta_usWhereInput | beta_usWhereInput[]
    industry?: StringFilter<"beta_us"> | string
    no_of_firms?: StringNullableFilter<"beta_us"> | string | null
    avg_unlevered_beta?: StringNullableFilter<"beta_us"> | string | null
    avg_levered_beta?: StringNullableFilter<"beta_us"> | string | null
    avg_correlation_with_mkt?: StringNullableFilter<"beta_us"> | string | null
    total_unlevered_beta?: StringNullableFilter<"beta_us"> | string | null
    total_levered_beta?: StringNullableFilter<"beta_us"> | string | null
  }

  export type beta_usOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    avg_unlevered_beta?: SortOrderInput | SortOrder
    avg_levered_beta?: SortOrderInput | SortOrder
    avg_correlation_with_mkt?: SortOrderInput | SortOrder
    total_unlevered_beta?: SortOrderInput | SortOrder
    total_levered_beta?: SortOrderInput | SortOrder
  }

  export type beta_usWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: beta_usWhereInput | beta_usWhereInput[]
    OR?: beta_usWhereInput[]
    NOT?: beta_usWhereInput | beta_usWhereInput[]
    no_of_firms?: StringNullableFilter<"beta_us"> | string | null
    avg_unlevered_beta?: StringNullableFilter<"beta_us"> | string | null
    avg_levered_beta?: StringNullableFilter<"beta_us"> | string | null
    avg_correlation_with_mkt?: StringNullableFilter<"beta_us"> | string | null
    total_unlevered_beta?: StringNullableFilter<"beta_us"> | string | null
    total_levered_beta?: StringNullableFilter<"beta_us"> | string | null
  }, "industry">

  export type beta_usOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    avg_unlevered_beta?: SortOrderInput | SortOrder
    avg_levered_beta?: SortOrderInput | SortOrder
    avg_correlation_with_mkt?: SortOrderInput | SortOrder
    total_unlevered_beta?: SortOrderInput | SortOrder
    total_levered_beta?: SortOrderInput | SortOrder
    _count?: beta_usCountOrderByAggregateInput
    _max?: beta_usMaxOrderByAggregateInput
    _min?: beta_usMinOrderByAggregateInput
  }

  export type beta_usScalarWhereWithAggregatesInput = {
    AND?: beta_usScalarWhereWithAggregatesInput | beta_usScalarWhereWithAggregatesInput[]
    OR?: beta_usScalarWhereWithAggregatesInput[]
    NOT?: beta_usScalarWhereWithAggregatesInput | beta_usScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"beta_us"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
    avg_unlevered_beta?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
    avg_levered_beta?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
    avg_correlation_with_mkt?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
    total_unlevered_beta?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
    total_levered_beta?: StringNullableWithAggregatesFilter<"beta_us"> | string | null
  }

  export type country_risk_premiumWhereInput = {
    AND?: country_risk_premiumWhereInput | country_risk_premiumWhereInput[]
    OR?: country_risk_premiumWhereInput[]
    NOT?: country_risk_premiumWhereInput | country_risk_premiumWhereInput[]
    country?: StringFilter<"country_risk_premium"> | string
    adj_default_spread?: StringNullableFilter<"country_risk_premium"> | string | null
    equity_risk_premium?: StringNullableFilter<"country_risk_premium"> | string | null
    country_risk_premium?: StringNullableFilter<"country_risk_premium"> | string | null
    corporate_tax_rate?: StringNullableFilter<"country_risk_premium"> | string | null
    moody_rating?: StringNullableFilter<"country_risk_premium"> | string | null
    soverign_cds_spread?: StringNullableFilter<"country_risk_premium"> | string | null
  }

  export type country_risk_premiumOrderByWithRelationInput = {
    country?: SortOrder
    adj_default_spread?: SortOrderInput | SortOrder
    equity_risk_premium?: SortOrderInput | SortOrder
    country_risk_premium?: SortOrderInput | SortOrder
    corporate_tax_rate?: SortOrderInput | SortOrder
    moody_rating?: SortOrderInput | SortOrder
    soverign_cds_spread?: SortOrderInput | SortOrder
  }

  export type country_risk_premiumWhereUniqueInput = Prisma.AtLeast<{
    country?: string
    AND?: country_risk_premiumWhereInput | country_risk_premiumWhereInput[]
    OR?: country_risk_premiumWhereInput[]
    NOT?: country_risk_premiumWhereInput | country_risk_premiumWhereInput[]
    adj_default_spread?: StringNullableFilter<"country_risk_premium"> | string | null
    equity_risk_premium?: StringNullableFilter<"country_risk_premium"> | string | null
    country_risk_premium?: StringNullableFilter<"country_risk_premium"> | string | null
    corporate_tax_rate?: StringNullableFilter<"country_risk_premium"> | string | null
    moody_rating?: StringNullableFilter<"country_risk_premium"> | string | null
    soverign_cds_spread?: StringNullableFilter<"country_risk_premium"> | string | null
  }, "country">

  export type country_risk_premiumOrderByWithAggregationInput = {
    country?: SortOrder
    adj_default_spread?: SortOrderInput | SortOrder
    equity_risk_premium?: SortOrderInput | SortOrder
    country_risk_premium?: SortOrderInput | SortOrder
    corporate_tax_rate?: SortOrderInput | SortOrder
    moody_rating?: SortOrderInput | SortOrder
    soverign_cds_spread?: SortOrderInput | SortOrder
    _count?: country_risk_premiumCountOrderByAggregateInput
    _max?: country_risk_premiumMaxOrderByAggregateInput
    _min?: country_risk_premiumMinOrderByAggregateInput
  }

  export type country_risk_premiumScalarWhereWithAggregatesInput = {
    AND?: country_risk_premiumScalarWhereWithAggregatesInput | country_risk_premiumScalarWhereWithAggregatesInput[]
    OR?: country_risk_premiumScalarWhereWithAggregatesInput[]
    NOT?: country_risk_premiumScalarWhereWithAggregatesInput | country_risk_premiumScalarWhereWithAggregatesInput[]
    country?: StringWithAggregatesFilter<"country_risk_premium"> | string
    adj_default_spread?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
    equity_risk_premium?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
    country_risk_premium?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
    corporate_tax_rate?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
    moody_rating?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
    soverign_cds_spread?: StringNullableWithAggregatesFilter<"country_risk_premium"> | string | null
  }

  export type data_last_updateWhereInput = {
    AND?: data_last_updateWhereInput | data_last_updateWhereInput[]
    OR?: data_last_updateWhereInput[]
    NOT?: data_last_updateWhereInput | data_last_updateWhereInput[]
    data_name?: StringFilter<"data_last_update"> | string
    last_update?: DateTimeNullableFilter<"data_last_update"> | Date | string | null
  }

  export type data_last_updateOrderByWithRelationInput = {
    data_name?: SortOrder
    last_update?: SortOrderInput | SortOrder
  }

  export type data_last_updateWhereUniqueInput = Prisma.AtLeast<{
    data_name?: string
    AND?: data_last_updateWhereInput | data_last_updateWhereInput[]
    OR?: data_last_updateWhereInput[]
    NOT?: data_last_updateWhereInput | data_last_updateWhereInput[]
    last_update?: DateTimeNullableFilter<"data_last_update"> | Date | string | null
  }, "data_name">

  export type data_last_updateOrderByWithAggregationInput = {
    data_name?: SortOrder
    last_update?: SortOrderInput | SortOrder
    _count?: data_last_updateCountOrderByAggregateInput
    _max?: data_last_updateMaxOrderByAggregateInput
    _min?: data_last_updateMinOrderByAggregateInput
  }

  export type data_last_updateScalarWhereWithAggregatesInput = {
    AND?: data_last_updateScalarWhereWithAggregatesInput | data_last_updateScalarWhereWithAggregatesInput[]
    OR?: data_last_updateScalarWhereWithAggregatesInput[]
    NOT?: data_last_updateScalarWhereWithAggregatesInput | data_last_updateScalarWhereWithAggregatesInput[]
    data_name?: StringWithAggregatesFilter<"data_last_update"> | string
    last_update?: DateTimeNullableWithAggregatesFilter<"data_last_update"> | Date | string | null
  }

  export type ebit_growthWhereInput = {
    AND?: ebit_growthWhereInput | ebit_growthWhereInput[]
    OR?: ebit_growthWhereInput[]
    NOT?: ebit_growthWhereInput | ebit_growthWhereInput[]
    industry?: StringFilter<"ebit_growth"> | string
    no_of_firms?: StringNullableFilter<"ebit_growth"> | string | null
    roc?: StringNullableFilter<"ebit_growth"> | string | null
    reinvestment_rate?: StringNullableFilter<"ebit_growth"> | string | null
    expected_growth_ebit?: StringNullableFilter<"ebit_growth"> | string | null
  }

  export type ebit_growthOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    roc?: SortOrderInput | SortOrder
    reinvestment_rate?: SortOrderInput | SortOrder
    expected_growth_ebit?: SortOrderInput | SortOrder
  }

  export type ebit_growthWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: ebit_growthWhereInput | ebit_growthWhereInput[]
    OR?: ebit_growthWhereInput[]
    NOT?: ebit_growthWhereInput | ebit_growthWhereInput[]
    no_of_firms?: StringNullableFilter<"ebit_growth"> | string | null
    roc?: StringNullableFilter<"ebit_growth"> | string | null
    reinvestment_rate?: StringNullableFilter<"ebit_growth"> | string | null
    expected_growth_ebit?: StringNullableFilter<"ebit_growth"> | string | null
  }, "industry">

  export type ebit_growthOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    roc?: SortOrderInput | SortOrder
    reinvestment_rate?: SortOrderInput | SortOrder
    expected_growth_ebit?: SortOrderInput | SortOrder
    _count?: ebit_growthCountOrderByAggregateInput
    _max?: ebit_growthMaxOrderByAggregateInput
    _min?: ebit_growthMinOrderByAggregateInput
  }

  export type ebit_growthScalarWhereWithAggregatesInput = {
    AND?: ebit_growthScalarWhereWithAggregatesInput | ebit_growthScalarWhereWithAggregatesInput[]
    OR?: ebit_growthScalarWhereWithAggregatesInput[]
    NOT?: ebit_growthScalarWhereWithAggregatesInput | ebit_growthScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"ebit_growth"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"ebit_growth"> | string | null
    roc?: StringNullableWithAggregatesFilter<"ebit_growth"> | string | null
    reinvestment_rate?: StringNullableWithAggregatesFilter<"ebit_growth"> | string | null
    expected_growth_ebit?: StringNullableWithAggregatesFilter<"ebit_growth"> | string | null
  }

  export type pe_ratio_usWhereInput = {
    AND?: pe_ratio_usWhereInput | pe_ratio_usWhereInput[]
    OR?: pe_ratio_usWhereInput[]
    NOT?: pe_ratio_usWhereInput | pe_ratio_usWhereInput[]
    industry?: StringFilter<"pe_ratio_us"> | string
    no_of_firms?: StringNullableFilter<"pe_ratio_us"> | string | null
    perc_money_losing_firms_trailing?: StringNullableFilter<"pe_ratio_us"> | string | null
    current_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    trailing_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    forward_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_net_income?: StringNullableFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: StringNullableFilter<"pe_ratio_us"> | string | null
    expected_growth_next_5_yrs?: StringNullableFilter<"pe_ratio_us"> | string | null
    peg_ratio?: StringNullableFilter<"pe_ratio_us"> | string | null
  }

  export type pe_ratio_usOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    perc_money_losing_firms_trailing?: SortOrderInput | SortOrder
    current_pe?: SortOrderInput | SortOrder
    trailing_pe?: SortOrderInput | SortOrder
    forward_pe?: SortOrderInput | SortOrder
    agg_mkt_cap_net_income?: SortOrderInput | SortOrder
    agg_mkt_cap_trailing_net_income_money_making_firms?: SortOrderInput | SortOrder
    expected_growth_next_5_yrs?: SortOrderInput | SortOrder
    peg_ratio?: SortOrderInput | SortOrder
  }

  export type pe_ratio_usWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: pe_ratio_usWhereInput | pe_ratio_usWhereInput[]
    OR?: pe_ratio_usWhereInput[]
    NOT?: pe_ratio_usWhereInput | pe_ratio_usWhereInput[]
    no_of_firms?: StringNullableFilter<"pe_ratio_us"> | string | null
    perc_money_losing_firms_trailing?: StringNullableFilter<"pe_ratio_us"> | string | null
    current_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    trailing_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    forward_pe?: StringNullableFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_net_income?: StringNullableFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: StringNullableFilter<"pe_ratio_us"> | string | null
    expected_growth_next_5_yrs?: StringNullableFilter<"pe_ratio_us"> | string | null
    peg_ratio?: StringNullableFilter<"pe_ratio_us"> | string | null
  }, "industry">

  export type pe_ratio_usOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    perc_money_losing_firms_trailing?: SortOrderInput | SortOrder
    current_pe?: SortOrderInput | SortOrder
    trailing_pe?: SortOrderInput | SortOrder
    forward_pe?: SortOrderInput | SortOrder
    agg_mkt_cap_net_income?: SortOrderInput | SortOrder
    agg_mkt_cap_trailing_net_income_money_making_firms?: SortOrderInput | SortOrder
    expected_growth_next_5_yrs?: SortOrderInput | SortOrder
    peg_ratio?: SortOrderInput | SortOrder
    _count?: pe_ratio_usCountOrderByAggregateInput
    _max?: pe_ratio_usMaxOrderByAggregateInput
    _min?: pe_ratio_usMinOrderByAggregateInput
  }

  export type pe_ratio_usScalarWhereWithAggregatesInput = {
    AND?: pe_ratio_usScalarWhereWithAggregatesInput | pe_ratio_usScalarWhereWithAggregatesInput[]
    OR?: pe_ratio_usScalarWhereWithAggregatesInput[]
    NOT?: pe_ratio_usScalarWhereWithAggregatesInput | pe_ratio_usScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"pe_ratio_us"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    perc_money_losing_firms_trailing?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    current_pe?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    trailing_pe?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    forward_pe?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_net_income?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    expected_growth_next_5_yrs?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
    peg_ratio?: StringNullableWithAggregatesFilter<"pe_ratio_us"> | string | null
  }

  export type rev_growth_rateWhereInput = {
    AND?: rev_growth_rateWhereInput | rev_growth_rateWhereInput[]
    OR?: rev_growth_rateWhereInput[]
    NOT?: rev_growth_rateWhereInput | rev_growth_rateWhereInput[]
    industry?: StringFilter<"rev_growth_rate"> | string
    no_of_firms?: StringNullableFilter<"rev_growth_rate"> | string | null
    cagr_net_income_last_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    cagr_net_rev_last_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_2_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_eps_next_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
  }

  export type rev_growth_rateOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    cagr_net_income_last_5_years?: SortOrderInput | SortOrder
    cagr_net_rev_last_5_years?: SortOrderInput | SortOrder
    expected_growth_rev_next_2_years?: SortOrderInput | SortOrder
    expected_growth_rev_next_5_years?: SortOrderInput | SortOrder
    expected_growth_eps_next_5_years?: SortOrderInput | SortOrder
  }

  export type rev_growth_rateWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: rev_growth_rateWhereInput | rev_growth_rateWhereInput[]
    OR?: rev_growth_rateWhereInput[]
    NOT?: rev_growth_rateWhereInput | rev_growth_rateWhereInput[]
    no_of_firms?: StringNullableFilter<"rev_growth_rate"> | string | null
    cagr_net_income_last_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    cagr_net_rev_last_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_2_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
    expected_growth_eps_next_5_years?: StringNullableFilter<"rev_growth_rate"> | string | null
  }, "industry">

  export type rev_growth_rateOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    cagr_net_income_last_5_years?: SortOrderInput | SortOrder
    cagr_net_rev_last_5_years?: SortOrderInput | SortOrder
    expected_growth_rev_next_2_years?: SortOrderInput | SortOrder
    expected_growth_rev_next_5_years?: SortOrderInput | SortOrder
    expected_growth_eps_next_5_years?: SortOrderInput | SortOrder
    _count?: rev_growth_rateCountOrderByAggregateInput
    _max?: rev_growth_rateMaxOrderByAggregateInput
    _min?: rev_growth_rateMinOrderByAggregateInput
  }

  export type rev_growth_rateScalarWhereWithAggregatesInput = {
    AND?: rev_growth_rateScalarWhereWithAggregatesInput | rev_growth_rateScalarWhereWithAggregatesInput[]
    OR?: rev_growth_rateScalarWhereWithAggregatesInput[]
    NOT?: rev_growth_rateScalarWhereWithAggregatesInput | rev_growth_rateScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"rev_growth_rate"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
    cagr_net_income_last_5_years?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
    cagr_net_rev_last_5_years?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_2_years?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
    expected_growth_rev_next_5_years?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
    expected_growth_eps_next_5_years?: StringNullableWithAggregatesFilter<"rev_growth_rate"> | string | null
  }

  export type sales_to_cap_usWhereInput = {
    AND?: sales_to_cap_usWhereInput | sales_to_cap_usWhereInput[]
    OR?: sales_to_cap_usWhereInput[]
    NOT?: sales_to_cap_usWhereInput | sales_to_cap_usWhereInput[]
    industry?: StringFilter<"sales_to_cap_us"> | string
    no_of_firms?: StringNullableFilter<"sales_to_cap_us"> | string | null
    capex?: StringNullableFilter<"sales_to_cap_us"> | string | null
    depre_amort?: StringNullableFilter<"sales_to_cap_us"> | string | null
    capex_depre?: StringNullableFilter<"sales_to_cap_us"> | string | null
    acquisitions?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_r_and_d?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_capex_sales?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_capex_ebit_aftertax?: StringNullableFilter<"sales_to_cap_us"> | string | null
    sales_invested_capital?: StringNullableFilter<"sales_to_cap_us"> | string | null
  }

  export type sales_to_cap_usOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    capex?: SortOrderInput | SortOrder
    depre_amort?: SortOrderInput | SortOrder
    capex_depre?: SortOrderInput | SortOrder
    acquisitions?: SortOrderInput | SortOrder
    net_r_and_d?: SortOrderInput | SortOrder
    net_capex_sales?: SortOrderInput | SortOrder
    net_capex_ebit_aftertax?: SortOrderInput | SortOrder
    sales_invested_capital?: SortOrderInput | SortOrder
  }

  export type sales_to_cap_usWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: sales_to_cap_usWhereInput | sales_to_cap_usWhereInput[]
    OR?: sales_to_cap_usWhereInput[]
    NOT?: sales_to_cap_usWhereInput | sales_to_cap_usWhereInput[]
    no_of_firms?: StringNullableFilter<"sales_to_cap_us"> | string | null
    capex?: StringNullableFilter<"sales_to_cap_us"> | string | null
    depre_amort?: StringNullableFilter<"sales_to_cap_us"> | string | null
    capex_depre?: StringNullableFilter<"sales_to_cap_us"> | string | null
    acquisitions?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_r_and_d?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_capex_sales?: StringNullableFilter<"sales_to_cap_us"> | string | null
    net_capex_ebit_aftertax?: StringNullableFilter<"sales_to_cap_us"> | string | null
    sales_invested_capital?: StringNullableFilter<"sales_to_cap_us"> | string | null
  }, "industry">

  export type sales_to_cap_usOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    capex?: SortOrderInput | SortOrder
    depre_amort?: SortOrderInput | SortOrder
    capex_depre?: SortOrderInput | SortOrder
    acquisitions?: SortOrderInput | SortOrder
    net_r_and_d?: SortOrderInput | SortOrder
    net_capex_sales?: SortOrderInput | SortOrder
    net_capex_ebit_aftertax?: SortOrderInput | SortOrder
    sales_invested_capital?: SortOrderInput | SortOrder
    _count?: sales_to_cap_usCountOrderByAggregateInput
    _max?: sales_to_cap_usMaxOrderByAggregateInput
    _min?: sales_to_cap_usMinOrderByAggregateInput
  }

  export type sales_to_cap_usScalarWhereWithAggregatesInput = {
    AND?: sales_to_cap_usScalarWhereWithAggregatesInput | sales_to_cap_usScalarWhereWithAggregatesInput[]
    OR?: sales_to_cap_usScalarWhereWithAggregatesInput[]
    NOT?: sales_to_cap_usScalarWhereWithAggregatesInput | sales_to_cap_usScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"sales_to_cap_us"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    capex?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    depre_amort?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    capex_depre?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    acquisitions?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    net_r_and_d?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    net_capex_sales?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    net_capex_ebit_aftertax?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
    sales_invested_capital?: StringNullableWithAggregatesFilter<"sales_to_cap_us"> | string | null
  }

  export type effective_tax_rateWhereInput = {
    AND?: effective_tax_rateWhereInput | effective_tax_rateWhereInput[]
    OR?: effective_tax_rateWhereInput[]
    NOT?: effective_tax_rateWhereInput | effective_tax_rateWhereInput[]
    industry?: StringFilter<"effective_tax_rate"> | string
    no_of_firms?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_taxable_income?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_taxes_paid_accrual?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_cash_taxes_paid?: StringNullableFilter<"effective_tax_rate"> | string | null
    cash_taxes_accrual_taxes?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_all_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_money_making_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_agg_tax_rate?: StringNullableFilter<"effective_tax_rate"> | string | null
    cashtr_avg_across_money_making_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    cashtr_agg_tax_rate?: StringNullableFilter<"effective_tax_rate"> | string | null
  }

  export type effective_tax_rateOrderByWithRelationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    total_taxable_income?: SortOrderInput | SortOrder
    total_taxes_paid_accrual?: SortOrderInput | SortOrder
    total_cash_taxes_paid?: SortOrderInput | SortOrder
    cash_taxes_accrual_taxes?: SortOrderInput | SortOrder
    effectivetr_avg_across_all_comp?: SortOrderInput | SortOrder
    effectivetr_avg_across_money_making_comp?: SortOrderInput | SortOrder
    effectivetr_agg_tax_rate?: SortOrderInput | SortOrder
    cashtr_avg_across_money_making_comp?: SortOrderInput | SortOrder
    cashtr_agg_tax_rate?: SortOrderInput | SortOrder
  }

  export type effective_tax_rateWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: effective_tax_rateWhereInput | effective_tax_rateWhereInput[]
    OR?: effective_tax_rateWhereInput[]
    NOT?: effective_tax_rateWhereInput | effective_tax_rateWhereInput[]
    no_of_firms?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_taxable_income?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_taxes_paid_accrual?: StringNullableFilter<"effective_tax_rate"> | string | null
    total_cash_taxes_paid?: StringNullableFilter<"effective_tax_rate"> | string | null
    cash_taxes_accrual_taxes?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_all_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_money_making_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    effectivetr_agg_tax_rate?: StringNullableFilter<"effective_tax_rate"> | string | null
    cashtr_avg_across_money_making_comp?: StringNullableFilter<"effective_tax_rate"> | string | null
    cashtr_agg_tax_rate?: StringNullableFilter<"effective_tax_rate"> | string | null
  }, "industry">

  export type effective_tax_rateOrderByWithAggregationInput = {
    industry?: SortOrder
    no_of_firms?: SortOrderInput | SortOrder
    total_taxable_income?: SortOrderInput | SortOrder
    total_taxes_paid_accrual?: SortOrderInput | SortOrder
    total_cash_taxes_paid?: SortOrderInput | SortOrder
    cash_taxes_accrual_taxes?: SortOrderInput | SortOrder
    effectivetr_avg_across_all_comp?: SortOrderInput | SortOrder
    effectivetr_avg_across_money_making_comp?: SortOrderInput | SortOrder
    effectivetr_agg_tax_rate?: SortOrderInput | SortOrder
    cashtr_avg_across_money_making_comp?: SortOrderInput | SortOrder
    cashtr_agg_tax_rate?: SortOrderInput | SortOrder
    _count?: effective_tax_rateCountOrderByAggregateInput
    _max?: effective_tax_rateMaxOrderByAggregateInput
    _min?: effective_tax_rateMinOrderByAggregateInput
  }

  export type effective_tax_rateScalarWhereWithAggregatesInput = {
    AND?: effective_tax_rateScalarWhereWithAggregatesInput | effective_tax_rateScalarWhereWithAggregatesInput[]
    OR?: effective_tax_rateScalarWhereWithAggregatesInput[]
    NOT?: effective_tax_rateScalarWhereWithAggregatesInput | effective_tax_rateScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"effective_tax_rate"> | string
    no_of_firms?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    total_taxable_income?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    total_taxes_paid_accrual?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    total_cash_taxes_paid?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    cash_taxes_accrual_taxes?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_all_comp?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    effectivetr_avg_across_money_making_comp?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    effectivetr_agg_tax_rate?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    cashtr_avg_across_money_making_comp?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
    cashtr_agg_tax_rate?: StringNullableWithAggregatesFilter<"effective_tax_rate"> | string | null
  }

  export type default_spread_large_firmWhereInput = {
    AND?: default_spread_large_firmWhereInput | default_spread_large_firmWhereInput[]
    OR?: default_spread_large_firmWhereInput[]
    NOT?: default_spread_large_firmWhereInput | default_spread_large_firmWhereInput[]
    min?: StringNullableFilter<"default_spread_large_firm"> | string | null
    max?: StringNullableFilter<"default_spread_large_firm"> | string | null
    rating?: StringFilter<"default_spread_large_firm"> | string
    spread?: StringNullableFilter<"default_spread_large_firm"> | string | null
  }

  export type default_spread_large_firmOrderByWithRelationInput = {
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    rating?: SortOrder
    spread?: SortOrderInput | SortOrder
  }

  export type default_spread_large_firmWhereUniqueInput = Prisma.AtLeast<{
    rating?: string
    AND?: default_spread_large_firmWhereInput | default_spread_large_firmWhereInput[]
    OR?: default_spread_large_firmWhereInput[]
    NOT?: default_spread_large_firmWhereInput | default_spread_large_firmWhereInput[]
    min?: StringNullableFilter<"default_spread_large_firm"> | string | null
    max?: StringNullableFilter<"default_spread_large_firm"> | string | null
    spread?: StringNullableFilter<"default_spread_large_firm"> | string | null
  }, "rating">

  export type default_spread_large_firmOrderByWithAggregationInput = {
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    rating?: SortOrder
    spread?: SortOrderInput | SortOrder
    _count?: default_spread_large_firmCountOrderByAggregateInput
    _max?: default_spread_large_firmMaxOrderByAggregateInput
    _min?: default_spread_large_firmMinOrderByAggregateInput
  }

  export type default_spread_large_firmScalarWhereWithAggregatesInput = {
    AND?: default_spread_large_firmScalarWhereWithAggregatesInput | default_spread_large_firmScalarWhereWithAggregatesInput[]
    OR?: default_spread_large_firmScalarWhereWithAggregatesInput[]
    NOT?: default_spread_large_firmScalarWhereWithAggregatesInput | default_spread_large_firmScalarWhereWithAggregatesInput[]
    min?: StringNullableWithAggregatesFilter<"default_spread_large_firm"> | string | null
    max?: StringNullableWithAggregatesFilter<"default_spread_large_firm"> | string | null
    rating?: StringWithAggregatesFilter<"default_spread_large_firm"> | string
    spread?: StringNullableWithAggregatesFilter<"default_spread_large_firm"> | string | null
  }

  export type default_spread_small_firmWhereInput = {
    AND?: default_spread_small_firmWhereInput | default_spread_small_firmWhereInput[]
    OR?: default_spread_small_firmWhereInput[]
    NOT?: default_spread_small_firmWhereInput | default_spread_small_firmWhereInput[]
    min?: StringNullableFilter<"default_spread_small_firm"> | string | null
    max?: StringNullableFilter<"default_spread_small_firm"> | string | null
    rating?: StringFilter<"default_spread_small_firm"> | string
    spread?: StringNullableFilter<"default_spread_small_firm"> | string | null
  }

  export type default_spread_small_firmOrderByWithRelationInput = {
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    rating?: SortOrder
    spread?: SortOrderInput | SortOrder
  }

  export type default_spread_small_firmWhereUniqueInput = Prisma.AtLeast<{
    rating?: string
    AND?: default_spread_small_firmWhereInput | default_spread_small_firmWhereInput[]
    OR?: default_spread_small_firmWhereInput[]
    NOT?: default_spread_small_firmWhereInput | default_spread_small_firmWhereInput[]
    min?: StringNullableFilter<"default_spread_small_firm"> | string | null
    max?: StringNullableFilter<"default_spread_small_firm"> | string | null
    spread?: StringNullableFilter<"default_spread_small_firm"> | string | null
  }, "rating">

  export type default_spread_small_firmOrderByWithAggregationInput = {
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    rating?: SortOrder
    spread?: SortOrderInput | SortOrder
    _count?: default_spread_small_firmCountOrderByAggregateInput
    _max?: default_spread_small_firmMaxOrderByAggregateInput
    _min?: default_spread_small_firmMinOrderByAggregateInput
  }

  export type default_spread_small_firmScalarWhereWithAggregatesInput = {
    AND?: default_spread_small_firmScalarWhereWithAggregatesInput | default_spread_small_firmScalarWhereWithAggregatesInput[]
    OR?: default_spread_small_firmScalarWhereWithAggregatesInput[]
    NOT?: default_spread_small_firmScalarWhereWithAggregatesInput | default_spread_small_firmScalarWhereWithAggregatesInput[]
    min?: StringNullableWithAggregatesFilter<"default_spread_small_firm"> | string | null
    max?: StringNullableWithAggregatesFilter<"default_spread_small_firm"> | string | null
    rating?: StringWithAggregatesFilter<"default_spread_small_firm"> | string
    spread?: StringNullableWithAggregatesFilter<"default_spread_small_firm"> | string | null
  }

  export type input_statsWhereInput = {
    AND?: input_statsWhereInput | input_statsWhereInput[]
    OR?: input_statsWhereInput[]
    NOT?: input_statsWhereInput | input_statsWhereInput[]
    industry?: StringFilter<"input_stats"> | string
    count?: IntNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_median?: FloatNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_median?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_median?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_median?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    beta_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    beta_median?: FloatNullableFilter<"input_stats"> | number | null
    beta_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_median?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
  }

  export type input_statsOrderByWithRelationInput = {
    industry?: SortOrder
    count?: SortOrderInput | SortOrder
    revenue_growth_rate_first_quartile?: SortOrderInput | SortOrder
    revenue_growth_rate_median?: SortOrderInput | SortOrder
    revenue_growth_rate_third_quartile?: SortOrderInput | SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrderInput | SortOrder
    pre_tax_operating_margin_median?: SortOrderInput | SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrderInput | SortOrder
    sales_to_invested_capital_first_quartile?: SortOrderInput | SortOrder
    sales_to_invested_capital_median?: SortOrderInput | SortOrder
    sales_to_invested_capital_third_quartile?: SortOrderInput | SortOrder
    cost_of_capital_first_quartile?: SortOrderInput | SortOrder
    cost_of_capital_median?: SortOrderInput | SortOrder
    cost_of_capital_third_quartile?: SortOrderInput | SortOrder
    beta_first_quartile?: SortOrderInput | SortOrder
    beta_median?: SortOrderInput | SortOrder
    beta_third_quartile?: SortOrderInput | SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrderInput | SortOrder
    debt_to_capital_ratio_median?: SortOrderInput | SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrderInput | SortOrder
  }

  export type input_statsWhereUniqueInput = Prisma.AtLeast<{
    industry?: string
    AND?: input_statsWhereInput | input_statsWhereInput[]
    OR?: input_statsWhereInput[]
    NOT?: input_statsWhereInput | input_statsWhereInput[]
    count?: IntNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_median?: FloatNullableFilter<"input_stats"> | number | null
    revenue_growth_rate_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_median?: FloatNullableFilter<"input_stats"> | number | null
    pre_tax_operating_margin_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_median?: FloatNullableFilter<"input_stats"> | number | null
    sales_to_invested_capital_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_median?: FloatNullableFilter<"input_stats"> | number | null
    cost_of_capital_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    beta_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    beta_median?: FloatNullableFilter<"input_stats"> | number | null
    beta_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_first_quartile?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_median?: FloatNullableFilter<"input_stats"> | number | null
    debt_to_capital_ratio_third_quartile?: FloatNullableFilter<"input_stats"> | number | null
  }, "industry">

  export type input_statsOrderByWithAggregationInput = {
    industry?: SortOrder
    count?: SortOrderInput | SortOrder
    revenue_growth_rate_first_quartile?: SortOrderInput | SortOrder
    revenue_growth_rate_median?: SortOrderInput | SortOrder
    revenue_growth_rate_third_quartile?: SortOrderInput | SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrderInput | SortOrder
    pre_tax_operating_margin_median?: SortOrderInput | SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrderInput | SortOrder
    sales_to_invested_capital_first_quartile?: SortOrderInput | SortOrder
    sales_to_invested_capital_median?: SortOrderInput | SortOrder
    sales_to_invested_capital_third_quartile?: SortOrderInput | SortOrder
    cost_of_capital_first_quartile?: SortOrderInput | SortOrder
    cost_of_capital_median?: SortOrderInput | SortOrder
    cost_of_capital_third_quartile?: SortOrderInput | SortOrder
    beta_first_quartile?: SortOrderInput | SortOrder
    beta_median?: SortOrderInput | SortOrder
    beta_third_quartile?: SortOrderInput | SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrderInput | SortOrder
    debt_to_capital_ratio_median?: SortOrderInput | SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrderInput | SortOrder
    _count?: input_statsCountOrderByAggregateInput
    _avg?: input_statsAvgOrderByAggregateInput
    _max?: input_statsMaxOrderByAggregateInput
    _min?: input_statsMinOrderByAggregateInput
    _sum?: input_statsSumOrderByAggregateInput
  }

  export type input_statsScalarWhereWithAggregatesInput = {
    AND?: input_statsScalarWhereWithAggregatesInput | input_statsScalarWhereWithAggregatesInput[]
    OR?: input_statsScalarWhereWithAggregatesInput[]
    NOT?: input_statsScalarWhereWithAggregatesInput | input_statsScalarWhereWithAggregatesInput[]
    industry?: StringWithAggregatesFilter<"input_stats"> | string
    count?: IntNullableWithAggregatesFilter<"input_stats"> | number | null
    revenue_growth_rate_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    revenue_growth_rate_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    revenue_growth_rate_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    pre_tax_operating_margin_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    pre_tax_operating_margin_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    pre_tax_operating_margin_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    sales_to_invested_capital_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    sales_to_invested_capital_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    sales_to_invested_capital_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    cost_of_capital_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    cost_of_capital_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    cost_of_capital_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    beta_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    beta_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    beta_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    debt_to_capital_ratio_first_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    debt_to_capital_ratio_median?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
    debt_to_capital_ratio_third_quartile?: FloatNullableWithAggregatesFilter<"input_stats"> | number | null
  }

  export type valuationWhereInput = {
    AND?: valuationWhereInput | valuationWhereInput[]
    OR?: valuationWhereInput[]
    NOT?: valuationWhereInput | valuationWhereInput[]
    id?: IntFilter<"valuation"> | number
    symbol?: StringNullableFilter<"valuation"> | string | null
    email?: StringNullableFilter<"valuation"> | string | null
    inputs?: JsonNullableFilter<"valuation">
    fetched_inputs?: JsonNullableFilter<"valuation">
    stock_info?: JsonNullableFilter<"valuation">
    valuation_model?: JsonNullableFilter<"valuation">
    valuation_output?: JsonNullableFilter<"valuation">
    implied_share_price?: DecimalNullableFilter<"valuation"> | Decimal | DecimalJsLike | number | string | null
    description?: StringNullableFilter<"valuation"> | string | null
    valued_date?: IntNullableFilter<"valuation"> | number | null
  }

  export type valuationOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    inputs?: SortOrderInput | SortOrder
    fetched_inputs?: SortOrderInput | SortOrder
    stock_info?: SortOrderInput | SortOrder
    valuation_model?: SortOrderInput | SortOrder
    valuation_output?: SortOrderInput | SortOrder
    implied_share_price?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    valued_date?: SortOrderInput | SortOrder
  }

  export type valuationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: valuationWhereInput | valuationWhereInput[]
    OR?: valuationWhereInput[]
    NOT?: valuationWhereInput | valuationWhereInput[]
    symbol?: StringNullableFilter<"valuation"> | string | null
    email?: StringNullableFilter<"valuation"> | string | null
    inputs?: JsonNullableFilter<"valuation">
    fetched_inputs?: JsonNullableFilter<"valuation">
    stock_info?: JsonNullableFilter<"valuation">
    valuation_model?: JsonNullableFilter<"valuation">
    valuation_output?: JsonNullableFilter<"valuation">
    implied_share_price?: DecimalNullableFilter<"valuation"> | Decimal | DecimalJsLike | number | string | null
    description?: StringNullableFilter<"valuation"> | string | null
    valued_date?: IntNullableFilter<"valuation"> | number | null
  }, "id">

  export type valuationOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    inputs?: SortOrderInput | SortOrder
    fetched_inputs?: SortOrderInput | SortOrder
    stock_info?: SortOrderInput | SortOrder
    valuation_model?: SortOrderInput | SortOrder
    valuation_output?: SortOrderInput | SortOrder
    implied_share_price?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    valued_date?: SortOrderInput | SortOrder
    _count?: valuationCountOrderByAggregateInput
    _avg?: valuationAvgOrderByAggregateInput
    _max?: valuationMaxOrderByAggregateInput
    _min?: valuationMinOrderByAggregateInput
    _sum?: valuationSumOrderByAggregateInput
  }

  export type valuationScalarWhereWithAggregatesInput = {
    AND?: valuationScalarWhereWithAggregatesInput | valuationScalarWhereWithAggregatesInput[]
    OR?: valuationScalarWhereWithAggregatesInput[]
    NOT?: valuationScalarWhereWithAggregatesInput | valuationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"valuation"> | number
    symbol?: StringNullableWithAggregatesFilter<"valuation"> | string | null
    email?: StringNullableWithAggregatesFilter<"valuation"> | string | null
    inputs?: JsonNullableWithAggregatesFilter<"valuation">
    fetched_inputs?: JsonNullableWithAggregatesFilter<"valuation">
    stock_info?: JsonNullableWithAggregatesFilter<"valuation">
    valuation_model?: JsonNullableWithAggregatesFilter<"valuation">
    valuation_output?: JsonNullableWithAggregatesFilter<"valuation">
    implied_share_price?: DecimalNullableWithAggregatesFilter<"valuation"> | Decimal | DecimalJsLike | number | string | null
    description?: StringNullableWithAggregatesFilter<"valuation"> | string | null
    valued_date?: IntNullableWithAggregatesFilter<"valuation"> | number | null
  }

  export type beta_usCreateInput = {
    industry: string
    no_of_firms?: string | null
    avg_unlevered_beta?: string | null
    avg_levered_beta?: string | null
    avg_correlation_with_mkt?: string | null
    total_unlevered_beta?: string | null
    total_levered_beta?: string | null
  }

  export type beta_usUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    avg_unlevered_beta?: string | null
    avg_levered_beta?: string | null
    avg_correlation_with_mkt?: string | null
    total_unlevered_beta?: string | null
    total_levered_beta?: string | null
  }

  export type beta_usUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    avg_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_correlation_with_mkt?: NullableStringFieldUpdateOperationsInput | string | null
    total_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    total_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type beta_usUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    avg_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_correlation_with_mkt?: NullableStringFieldUpdateOperationsInput | string | null
    total_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    total_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type beta_usCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    avg_unlevered_beta?: string | null
    avg_levered_beta?: string | null
    avg_correlation_with_mkt?: string | null
    total_unlevered_beta?: string | null
    total_levered_beta?: string | null
  }

  export type beta_usUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    avg_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_correlation_with_mkt?: NullableStringFieldUpdateOperationsInput | string | null
    total_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    total_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type beta_usUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    avg_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    avg_correlation_with_mkt?: NullableStringFieldUpdateOperationsInput | string | null
    total_unlevered_beta?: NullableStringFieldUpdateOperationsInput | string | null
    total_levered_beta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type country_risk_premiumCreateInput = {
    country: string
    adj_default_spread?: string | null
    equity_risk_premium?: string | null
    country_risk_premium?: string | null
    corporate_tax_rate?: string | null
    moody_rating?: string | null
    soverign_cds_spread?: string | null
  }

  export type country_risk_premiumUncheckedCreateInput = {
    country: string
    adj_default_spread?: string | null
    equity_risk_premium?: string | null
    country_risk_premium?: string | null
    corporate_tax_rate?: string | null
    moody_rating?: string | null
    soverign_cds_spread?: string | null
  }

  export type country_risk_premiumUpdateInput = {
    country?: StringFieldUpdateOperationsInput | string
    adj_default_spread?: NullableStringFieldUpdateOperationsInput | string | null
    equity_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    country_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    corporate_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    moody_rating?: NullableStringFieldUpdateOperationsInput | string | null
    soverign_cds_spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type country_risk_premiumUncheckedUpdateInput = {
    country?: StringFieldUpdateOperationsInput | string
    adj_default_spread?: NullableStringFieldUpdateOperationsInput | string | null
    equity_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    country_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    corporate_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    moody_rating?: NullableStringFieldUpdateOperationsInput | string | null
    soverign_cds_spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type country_risk_premiumCreateManyInput = {
    country: string
    adj_default_spread?: string | null
    equity_risk_premium?: string | null
    country_risk_premium?: string | null
    corporate_tax_rate?: string | null
    moody_rating?: string | null
    soverign_cds_spread?: string | null
  }

  export type country_risk_premiumUpdateManyMutationInput = {
    country?: StringFieldUpdateOperationsInput | string
    adj_default_spread?: NullableStringFieldUpdateOperationsInput | string | null
    equity_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    country_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    corporate_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    moody_rating?: NullableStringFieldUpdateOperationsInput | string | null
    soverign_cds_spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type country_risk_premiumUncheckedUpdateManyInput = {
    country?: StringFieldUpdateOperationsInput | string
    adj_default_spread?: NullableStringFieldUpdateOperationsInput | string | null
    equity_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    country_risk_premium?: NullableStringFieldUpdateOperationsInput | string | null
    corporate_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    moody_rating?: NullableStringFieldUpdateOperationsInput | string | null
    soverign_cds_spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type data_last_updateCreateInput = {
    data_name: string
    last_update?: Date | string | null
  }

  export type data_last_updateUncheckedCreateInput = {
    data_name: string
    last_update?: Date | string | null
  }

  export type data_last_updateUpdateInput = {
    data_name?: StringFieldUpdateOperationsInput | string
    last_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type data_last_updateUncheckedUpdateInput = {
    data_name?: StringFieldUpdateOperationsInput | string
    last_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type data_last_updateCreateManyInput = {
    data_name: string
    last_update?: Date | string | null
  }

  export type data_last_updateUpdateManyMutationInput = {
    data_name?: StringFieldUpdateOperationsInput | string
    last_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type data_last_updateUncheckedUpdateManyInput = {
    data_name?: StringFieldUpdateOperationsInput | string
    last_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ebit_growthCreateInput = {
    industry: string
    no_of_firms?: string | null
    roc?: string | null
    reinvestment_rate?: string | null
    expected_growth_ebit?: string | null
  }

  export type ebit_growthUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    roc?: string | null
    reinvestment_rate?: string | null
    expected_growth_ebit?: string | null
  }

  export type ebit_growthUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    roc?: NullableStringFieldUpdateOperationsInput | string | null
    reinvestment_rate?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_ebit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ebit_growthUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    roc?: NullableStringFieldUpdateOperationsInput | string | null
    reinvestment_rate?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_ebit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ebit_growthCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    roc?: string | null
    reinvestment_rate?: string | null
    expected_growth_ebit?: string | null
  }

  export type ebit_growthUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    roc?: NullableStringFieldUpdateOperationsInput | string | null
    reinvestment_rate?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_ebit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ebit_growthUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    roc?: NullableStringFieldUpdateOperationsInput | string | null
    reinvestment_rate?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_ebit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pe_ratio_usCreateInput = {
    industry: string
    no_of_firms?: string | null
    perc_money_losing_firms_trailing?: string | null
    current_pe?: string | null
    trailing_pe?: string | null
    forward_pe?: string | null
    agg_mkt_cap_net_income?: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: string | null
    expected_growth_next_5_yrs?: string | null
    peg_ratio?: string | null
  }

  export type pe_ratio_usUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    perc_money_losing_firms_trailing?: string | null
    current_pe?: string | null
    trailing_pe?: string | null
    forward_pe?: string | null
    agg_mkt_cap_net_income?: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: string | null
    expected_growth_next_5_yrs?: string | null
    peg_ratio?: string | null
  }

  export type pe_ratio_usUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    perc_money_losing_firms_trailing?: NullableStringFieldUpdateOperationsInput | string | null
    current_pe?: NullableStringFieldUpdateOperationsInput | string | null
    trailing_pe?: NullableStringFieldUpdateOperationsInput | string | null
    forward_pe?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_net_income?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_next_5_yrs?: NullableStringFieldUpdateOperationsInput | string | null
    peg_ratio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pe_ratio_usUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    perc_money_losing_firms_trailing?: NullableStringFieldUpdateOperationsInput | string | null
    current_pe?: NullableStringFieldUpdateOperationsInput | string | null
    trailing_pe?: NullableStringFieldUpdateOperationsInput | string | null
    forward_pe?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_net_income?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_next_5_yrs?: NullableStringFieldUpdateOperationsInput | string | null
    peg_ratio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pe_ratio_usCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    perc_money_losing_firms_trailing?: string | null
    current_pe?: string | null
    trailing_pe?: string | null
    forward_pe?: string | null
    agg_mkt_cap_net_income?: string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: string | null
    expected_growth_next_5_yrs?: string | null
    peg_ratio?: string | null
  }

  export type pe_ratio_usUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    perc_money_losing_firms_trailing?: NullableStringFieldUpdateOperationsInput | string | null
    current_pe?: NullableStringFieldUpdateOperationsInput | string | null
    trailing_pe?: NullableStringFieldUpdateOperationsInput | string | null
    forward_pe?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_net_income?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_next_5_yrs?: NullableStringFieldUpdateOperationsInput | string | null
    peg_ratio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pe_ratio_usUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    perc_money_losing_firms_trailing?: NullableStringFieldUpdateOperationsInput | string | null
    current_pe?: NullableStringFieldUpdateOperationsInput | string | null
    trailing_pe?: NullableStringFieldUpdateOperationsInput | string | null
    forward_pe?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_net_income?: NullableStringFieldUpdateOperationsInput | string | null
    agg_mkt_cap_trailing_net_income_money_making_firms?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_next_5_yrs?: NullableStringFieldUpdateOperationsInput | string | null
    peg_ratio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rev_growth_rateCreateInput = {
    industry: string
    no_of_firms?: string | null
    cagr_net_income_last_5_years?: string | null
    cagr_net_rev_last_5_years?: string | null
    expected_growth_rev_next_2_years?: string | null
    expected_growth_rev_next_5_years?: string | null
    expected_growth_eps_next_5_years?: string | null
  }

  export type rev_growth_rateUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    cagr_net_income_last_5_years?: string | null
    cagr_net_rev_last_5_years?: string | null
    expected_growth_rev_next_2_years?: string | null
    expected_growth_rev_next_5_years?: string | null
    expected_growth_eps_next_5_years?: string | null
  }

  export type rev_growth_rateUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_income_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_rev_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_2_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_eps_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rev_growth_rateUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_income_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_rev_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_2_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_eps_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rev_growth_rateCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    cagr_net_income_last_5_years?: string | null
    cagr_net_rev_last_5_years?: string | null
    expected_growth_rev_next_2_years?: string | null
    expected_growth_rev_next_5_years?: string | null
    expected_growth_eps_next_5_years?: string | null
  }

  export type rev_growth_rateUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_income_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_rev_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_2_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_eps_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rev_growth_rateUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_income_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    cagr_net_rev_last_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_2_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_rev_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
    expected_growth_eps_next_5_years?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sales_to_cap_usCreateInput = {
    industry: string
    no_of_firms?: string | null
    capex?: string | null
    depre_amort?: string | null
    capex_depre?: string | null
    acquisitions?: string | null
    net_r_and_d?: string | null
    net_capex_sales?: string | null
    net_capex_ebit_aftertax?: string | null
    sales_invested_capital?: string | null
  }

  export type sales_to_cap_usUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    capex?: string | null
    depre_amort?: string | null
    capex_depre?: string | null
    acquisitions?: string | null
    net_r_and_d?: string | null
    net_capex_sales?: string | null
    net_capex_ebit_aftertax?: string | null
    sales_invested_capital?: string | null
  }

  export type sales_to_cap_usUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    capex?: NullableStringFieldUpdateOperationsInput | string | null
    depre_amort?: NullableStringFieldUpdateOperationsInput | string | null
    capex_depre?: NullableStringFieldUpdateOperationsInput | string | null
    acquisitions?: NullableStringFieldUpdateOperationsInput | string | null
    net_r_and_d?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_sales?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_ebit_aftertax?: NullableStringFieldUpdateOperationsInput | string | null
    sales_invested_capital?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sales_to_cap_usUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    capex?: NullableStringFieldUpdateOperationsInput | string | null
    depre_amort?: NullableStringFieldUpdateOperationsInput | string | null
    capex_depre?: NullableStringFieldUpdateOperationsInput | string | null
    acquisitions?: NullableStringFieldUpdateOperationsInput | string | null
    net_r_and_d?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_sales?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_ebit_aftertax?: NullableStringFieldUpdateOperationsInput | string | null
    sales_invested_capital?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sales_to_cap_usCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    capex?: string | null
    depre_amort?: string | null
    capex_depre?: string | null
    acquisitions?: string | null
    net_r_and_d?: string | null
    net_capex_sales?: string | null
    net_capex_ebit_aftertax?: string | null
    sales_invested_capital?: string | null
  }

  export type sales_to_cap_usUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    capex?: NullableStringFieldUpdateOperationsInput | string | null
    depre_amort?: NullableStringFieldUpdateOperationsInput | string | null
    capex_depre?: NullableStringFieldUpdateOperationsInput | string | null
    acquisitions?: NullableStringFieldUpdateOperationsInput | string | null
    net_r_and_d?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_sales?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_ebit_aftertax?: NullableStringFieldUpdateOperationsInput | string | null
    sales_invested_capital?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sales_to_cap_usUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    capex?: NullableStringFieldUpdateOperationsInput | string | null
    depre_amort?: NullableStringFieldUpdateOperationsInput | string | null
    capex_depre?: NullableStringFieldUpdateOperationsInput | string | null
    acquisitions?: NullableStringFieldUpdateOperationsInput | string | null
    net_r_and_d?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_sales?: NullableStringFieldUpdateOperationsInput | string | null
    net_capex_ebit_aftertax?: NullableStringFieldUpdateOperationsInput | string | null
    sales_invested_capital?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type effective_tax_rateCreateInput = {
    industry: string
    no_of_firms?: string | null
    total_taxable_income?: string | null
    total_taxes_paid_accrual?: string | null
    total_cash_taxes_paid?: string | null
    cash_taxes_accrual_taxes?: string | null
    effectivetr_avg_across_all_comp?: string | null
    effectivetr_avg_across_money_making_comp?: string | null
    effectivetr_agg_tax_rate?: string | null
    cashtr_avg_across_money_making_comp?: string | null
    cashtr_agg_tax_rate?: string | null
  }

  export type effective_tax_rateUncheckedCreateInput = {
    industry: string
    no_of_firms?: string | null
    total_taxable_income?: string | null
    total_taxes_paid_accrual?: string | null
    total_cash_taxes_paid?: string | null
    cash_taxes_accrual_taxes?: string | null
    effectivetr_avg_across_all_comp?: string | null
    effectivetr_avg_across_money_making_comp?: string | null
    effectivetr_agg_tax_rate?: string | null
    cashtr_avg_across_money_making_comp?: string | null
    cashtr_agg_tax_rate?: string | null
  }

  export type effective_tax_rateUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxable_income?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxes_paid_accrual?: NullableStringFieldUpdateOperationsInput | string | null
    total_cash_taxes_paid?: NullableStringFieldUpdateOperationsInput | string | null
    cash_taxes_accrual_taxes?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_all_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type effective_tax_rateUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxable_income?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxes_paid_accrual?: NullableStringFieldUpdateOperationsInput | string | null
    total_cash_taxes_paid?: NullableStringFieldUpdateOperationsInput | string | null
    cash_taxes_accrual_taxes?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_all_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type effective_tax_rateCreateManyInput = {
    industry: string
    no_of_firms?: string | null
    total_taxable_income?: string | null
    total_taxes_paid_accrual?: string | null
    total_cash_taxes_paid?: string | null
    cash_taxes_accrual_taxes?: string | null
    effectivetr_avg_across_all_comp?: string | null
    effectivetr_avg_across_money_making_comp?: string | null
    effectivetr_agg_tax_rate?: string | null
    cashtr_avg_across_money_making_comp?: string | null
    cashtr_agg_tax_rate?: string | null
  }

  export type effective_tax_rateUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxable_income?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxes_paid_accrual?: NullableStringFieldUpdateOperationsInput | string | null
    total_cash_taxes_paid?: NullableStringFieldUpdateOperationsInput | string | null
    cash_taxes_accrual_taxes?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_all_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type effective_tax_rateUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    no_of_firms?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxable_income?: NullableStringFieldUpdateOperationsInput | string | null
    total_taxes_paid_accrual?: NullableStringFieldUpdateOperationsInput | string | null
    total_cash_taxes_paid?: NullableStringFieldUpdateOperationsInput | string | null
    cash_taxes_accrual_taxes?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_all_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    effectivetr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_avg_across_money_making_comp?: NullableStringFieldUpdateOperationsInput | string | null
    cashtr_agg_tax_rate?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_large_firmCreateInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_large_firmUncheckedCreateInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_large_firmUpdateInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_large_firmUncheckedUpdateInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_large_firmCreateManyInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_large_firmUpdateManyMutationInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_large_firmUncheckedUpdateManyInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_small_firmCreateInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_small_firmUncheckedCreateInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_small_firmUpdateInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_small_firmUncheckedUpdateInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_small_firmCreateManyInput = {
    min?: string | null
    max?: string | null
    rating: string
    spread?: string | null
  }

  export type default_spread_small_firmUpdateManyMutationInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type default_spread_small_firmUncheckedUpdateManyInput = {
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    spread?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type input_statsCreateInput = {
    industry: string
    count?: number | null
    revenue_growth_rate_first_quartile?: number | null
    revenue_growth_rate_median?: number | null
    revenue_growth_rate_third_quartile?: number | null
    pre_tax_operating_margin_first_quartile?: number | null
    pre_tax_operating_margin_median?: number | null
    pre_tax_operating_margin_third_quartile?: number | null
    sales_to_invested_capital_first_quartile?: number | null
    sales_to_invested_capital_median?: number | null
    sales_to_invested_capital_third_quartile?: number | null
    cost_of_capital_first_quartile?: number | null
    cost_of_capital_median?: number | null
    cost_of_capital_third_quartile?: number | null
    beta_first_quartile?: number | null
    beta_median?: number | null
    beta_third_quartile?: number | null
    debt_to_capital_ratio_first_quartile?: number | null
    debt_to_capital_ratio_median?: number | null
    debt_to_capital_ratio_third_quartile?: number | null
  }

  export type input_statsUncheckedCreateInput = {
    industry: string
    count?: number | null
    revenue_growth_rate_first_quartile?: number | null
    revenue_growth_rate_median?: number | null
    revenue_growth_rate_third_quartile?: number | null
    pre_tax_operating_margin_first_quartile?: number | null
    pre_tax_operating_margin_median?: number | null
    pre_tax_operating_margin_third_quartile?: number | null
    sales_to_invested_capital_first_quartile?: number | null
    sales_to_invested_capital_median?: number | null
    sales_to_invested_capital_third_quartile?: number | null
    cost_of_capital_first_quartile?: number | null
    cost_of_capital_median?: number | null
    cost_of_capital_third_quartile?: number | null
    beta_first_quartile?: number | null
    beta_median?: number | null
    beta_third_quartile?: number | null
    debt_to_capital_ratio_first_quartile?: number | null
    debt_to_capital_ratio_median?: number | null
    debt_to_capital_ratio_third_quartile?: number | null
  }

  export type input_statsUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    revenue_growth_rate_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_median?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_median?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_median?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_median?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type input_statsUncheckedUpdateInput = {
    industry?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    revenue_growth_rate_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_median?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_median?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_median?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_median?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type input_statsCreateManyInput = {
    industry: string
    count?: number | null
    revenue_growth_rate_first_quartile?: number | null
    revenue_growth_rate_median?: number | null
    revenue_growth_rate_third_quartile?: number | null
    pre_tax_operating_margin_first_quartile?: number | null
    pre_tax_operating_margin_median?: number | null
    pre_tax_operating_margin_third_quartile?: number | null
    sales_to_invested_capital_first_quartile?: number | null
    sales_to_invested_capital_median?: number | null
    sales_to_invested_capital_third_quartile?: number | null
    cost_of_capital_first_quartile?: number | null
    cost_of_capital_median?: number | null
    cost_of_capital_third_quartile?: number | null
    beta_first_quartile?: number | null
    beta_median?: number | null
    beta_third_quartile?: number | null
    debt_to_capital_ratio_first_quartile?: number | null
    debt_to_capital_ratio_median?: number | null
    debt_to_capital_ratio_third_quartile?: number | null
  }

  export type input_statsUpdateManyMutationInput = {
    industry?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    revenue_growth_rate_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_median?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_median?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_median?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_median?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type input_statsUncheckedUpdateManyInput = {
    industry?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    revenue_growth_rate_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_median?: NullableFloatFieldUpdateOperationsInput | number | null
    revenue_growth_rate_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_median?: NullableFloatFieldUpdateOperationsInput | number | null
    pre_tax_operating_margin_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    sales_to_invested_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_median?: NullableFloatFieldUpdateOperationsInput | number | null
    cost_of_capital_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_median?: NullableFloatFieldUpdateOperationsInput | number | null
    beta_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_first_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_median?: NullableFloatFieldUpdateOperationsInput | number | null
    debt_to_capital_ratio_third_quartile?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type valuationCreateInput = {
    symbol?: string | null
    email?: string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: Decimal | DecimalJsLike | number | string | null
    description?: string | null
    valued_date?: number | null
  }

  export type valuationUncheckedCreateInput = {
    id?: number
    symbol?: string | null
    email?: string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: Decimal | DecimalJsLike | number | string | null
    description?: string | null
    valued_date?: number | null
  }

  export type valuationUpdateInput = {
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    valued_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type valuationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    valued_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type valuationCreateManyInput = {
    id?: number
    symbol?: string | null
    email?: string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: Decimal | DecimalJsLike | number | string | null
    description?: string | null
    valued_date?: number | null
  }

  export type valuationUpdateManyMutationInput = {
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    valued_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type valuationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    inputs?: NullableJsonNullValueInput | InputJsonValue
    fetched_inputs?: NullableJsonNullValueInput | InputJsonValue
    stock_info?: NullableJsonNullValueInput | InputJsonValue
    valuation_model?: NullableJsonNullValueInput | InputJsonValue
    valuation_output?: NullableJsonNullValueInput | InputJsonValue
    implied_share_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    valued_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type beta_usCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    avg_unlevered_beta?: SortOrder
    avg_levered_beta?: SortOrder
    avg_correlation_with_mkt?: SortOrder
    total_unlevered_beta?: SortOrder
    total_levered_beta?: SortOrder
  }

  export type beta_usMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    avg_unlevered_beta?: SortOrder
    avg_levered_beta?: SortOrder
    avg_correlation_with_mkt?: SortOrder
    total_unlevered_beta?: SortOrder
    total_levered_beta?: SortOrder
  }

  export type beta_usMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    avg_unlevered_beta?: SortOrder
    avg_levered_beta?: SortOrder
    avg_correlation_with_mkt?: SortOrder
    total_unlevered_beta?: SortOrder
    total_levered_beta?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type country_risk_premiumCountOrderByAggregateInput = {
    country?: SortOrder
    adj_default_spread?: SortOrder
    equity_risk_premium?: SortOrder
    country_risk_premium?: SortOrder
    corporate_tax_rate?: SortOrder
    moody_rating?: SortOrder
    soverign_cds_spread?: SortOrder
  }

  export type country_risk_premiumMaxOrderByAggregateInput = {
    country?: SortOrder
    adj_default_spread?: SortOrder
    equity_risk_premium?: SortOrder
    country_risk_premium?: SortOrder
    corporate_tax_rate?: SortOrder
    moody_rating?: SortOrder
    soverign_cds_spread?: SortOrder
  }

  export type country_risk_premiumMinOrderByAggregateInput = {
    country?: SortOrder
    adj_default_spread?: SortOrder
    equity_risk_premium?: SortOrder
    country_risk_premium?: SortOrder
    corporate_tax_rate?: SortOrder
    moody_rating?: SortOrder
    soverign_cds_spread?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type data_last_updateCountOrderByAggregateInput = {
    data_name?: SortOrder
    last_update?: SortOrder
  }

  export type data_last_updateMaxOrderByAggregateInput = {
    data_name?: SortOrder
    last_update?: SortOrder
  }

  export type data_last_updateMinOrderByAggregateInput = {
    data_name?: SortOrder
    last_update?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ebit_growthCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    roc?: SortOrder
    reinvestment_rate?: SortOrder
    expected_growth_ebit?: SortOrder
  }

  export type ebit_growthMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    roc?: SortOrder
    reinvestment_rate?: SortOrder
    expected_growth_ebit?: SortOrder
  }

  export type ebit_growthMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    roc?: SortOrder
    reinvestment_rate?: SortOrder
    expected_growth_ebit?: SortOrder
  }

  export type pe_ratio_usCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    perc_money_losing_firms_trailing?: SortOrder
    current_pe?: SortOrder
    trailing_pe?: SortOrder
    forward_pe?: SortOrder
    agg_mkt_cap_net_income?: SortOrder
    agg_mkt_cap_trailing_net_income_money_making_firms?: SortOrder
    expected_growth_next_5_yrs?: SortOrder
    peg_ratio?: SortOrder
  }

  export type pe_ratio_usMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    perc_money_losing_firms_trailing?: SortOrder
    current_pe?: SortOrder
    trailing_pe?: SortOrder
    forward_pe?: SortOrder
    agg_mkt_cap_net_income?: SortOrder
    agg_mkt_cap_trailing_net_income_money_making_firms?: SortOrder
    expected_growth_next_5_yrs?: SortOrder
    peg_ratio?: SortOrder
  }

  export type pe_ratio_usMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    perc_money_losing_firms_trailing?: SortOrder
    current_pe?: SortOrder
    trailing_pe?: SortOrder
    forward_pe?: SortOrder
    agg_mkt_cap_net_income?: SortOrder
    agg_mkt_cap_trailing_net_income_money_making_firms?: SortOrder
    expected_growth_next_5_yrs?: SortOrder
    peg_ratio?: SortOrder
  }

  export type rev_growth_rateCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    cagr_net_income_last_5_years?: SortOrder
    cagr_net_rev_last_5_years?: SortOrder
    expected_growth_rev_next_2_years?: SortOrder
    expected_growth_rev_next_5_years?: SortOrder
    expected_growth_eps_next_5_years?: SortOrder
  }

  export type rev_growth_rateMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    cagr_net_income_last_5_years?: SortOrder
    cagr_net_rev_last_5_years?: SortOrder
    expected_growth_rev_next_2_years?: SortOrder
    expected_growth_rev_next_5_years?: SortOrder
    expected_growth_eps_next_5_years?: SortOrder
  }

  export type rev_growth_rateMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    cagr_net_income_last_5_years?: SortOrder
    cagr_net_rev_last_5_years?: SortOrder
    expected_growth_rev_next_2_years?: SortOrder
    expected_growth_rev_next_5_years?: SortOrder
    expected_growth_eps_next_5_years?: SortOrder
  }

  export type sales_to_cap_usCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    capex?: SortOrder
    depre_amort?: SortOrder
    capex_depre?: SortOrder
    acquisitions?: SortOrder
    net_r_and_d?: SortOrder
    net_capex_sales?: SortOrder
    net_capex_ebit_aftertax?: SortOrder
    sales_invested_capital?: SortOrder
  }

  export type sales_to_cap_usMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    capex?: SortOrder
    depre_amort?: SortOrder
    capex_depre?: SortOrder
    acquisitions?: SortOrder
    net_r_and_d?: SortOrder
    net_capex_sales?: SortOrder
    net_capex_ebit_aftertax?: SortOrder
    sales_invested_capital?: SortOrder
  }

  export type sales_to_cap_usMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    capex?: SortOrder
    depre_amort?: SortOrder
    capex_depre?: SortOrder
    acquisitions?: SortOrder
    net_r_and_d?: SortOrder
    net_capex_sales?: SortOrder
    net_capex_ebit_aftertax?: SortOrder
    sales_invested_capital?: SortOrder
  }

  export type effective_tax_rateCountOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    total_taxable_income?: SortOrder
    total_taxes_paid_accrual?: SortOrder
    total_cash_taxes_paid?: SortOrder
    cash_taxes_accrual_taxes?: SortOrder
    effectivetr_avg_across_all_comp?: SortOrder
    effectivetr_avg_across_money_making_comp?: SortOrder
    effectivetr_agg_tax_rate?: SortOrder
    cashtr_avg_across_money_making_comp?: SortOrder
    cashtr_agg_tax_rate?: SortOrder
  }

  export type effective_tax_rateMaxOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    total_taxable_income?: SortOrder
    total_taxes_paid_accrual?: SortOrder
    total_cash_taxes_paid?: SortOrder
    cash_taxes_accrual_taxes?: SortOrder
    effectivetr_avg_across_all_comp?: SortOrder
    effectivetr_avg_across_money_making_comp?: SortOrder
    effectivetr_agg_tax_rate?: SortOrder
    cashtr_avg_across_money_making_comp?: SortOrder
    cashtr_agg_tax_rate?: SortOrder
  }

  export type effective_tax_rateMinOrderByAggregateInput = {
    industry?: SortOrder
    no_of_firms?: SortOrder
    total_taxable_income?: SortOrder
    total_taxes_paid_accrual?: SortOrder
    total_cash_taxes_paid?: SortOrder
    cash_taxes_accrual_taxes?: SortOrder
    effectivetr_avg_across_all_comp?: SortOrder
    effectivetr_avg_across_money_making_comp?: SortOrder
    effectivetr_agg_tax_rate?: SortOrder
    cashtr_avg_across_money_making_comp?: SortOrder
    cashtr_agg_tax_rate?: SortOrder
  }

  export type default_spread_large_firmCountOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type default_spread_large_firmMaxOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type default_spread_large_firmMinOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type default_spread_small_firmCountOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type default_spread_small_firmMaxOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type default_spread_small_firmMinOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    rating?: SortOrder
    spread?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type input_statsCountOrderByAggregateInput = {
    industry?: SortOrder
    count?: SortOrder
    revenue_growth_rate_first_quartile?: SortOrder
    revenue_growth_rate_median?: SortOrder
    revenue_growth_rate_third_quartile?: SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrder
    pre_tax_operating_margin_median?: SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrder
    sales_to_invested_capital_first_quartile?: SortOrder
    sales_to_invested_capital_median?: SortOrder
    sales_to_invested_capital_third_quartile?: SortOrder
    cost_of_capital_first_quartile?: SortOrder
    cost_of_capital_median?: SortOrder
    cost_of_capital_third_quartile?: SortOrder
    beta_first_quartile?: SortOrder
    beta_median?: SortOrder
    beta_third_quartile?: SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrder
    debt_to_capital_ratio_median?: SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrder
  }

  export type input_statsAvgOrderByAggregateInput = {
    count?: SortOrder
    revenue_growth_rate_first_quartile?: SortOrder
    revenue_growth_rate_median?: SortOrder
    revenue_growth_rate_third_quartile?: SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrder
    pre_tax_operating_margin_median?: SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrder
    sales_to_invested_capital_first_quartile?: SortOrder
    sales_to_invested_capital_median?: SortOrder
    sales_to_invested_capital_third_quartile?: SortOrder
    cost_of_capital_first_quartile?: SortOrder
    cost_of_capital_median?: SortOrder
    cost_of_capital_third_quartile?: SortOrder
    beta_first_quartile?: SortOrder
    beta_median?: SortOrder
    beta_third_quartile?: SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrder
    debt_to_capital_ratio_median?: SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrder
  }

  export type input_statsMaxOrderByAggregateInput = {
    industry?: SortOrder
    count?: SortOrder
    revenue_growth_rate_first_quartile?: SortOrder
    revenue_growth_rate_median?: SortOrder
    revenue_growth_rate_third_quartile?: SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrder
    pre_tax_operating_margin_median?: SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrder
    sales_to_invested_capital_first_quartile?: SortOrder
    sales_to_invested_capital_median?: SortOrder
    sales_to_invested_capital_third_quartile?: SortOrder
    cost_of_capital_first_quartile?: SortOrder
    cost_of_capital_median?: SortOrder
    cost_of_capital_third_quartile?: SortOrder
    beta_first_quartile?: SortOrder
    beta_median?: SortOrder
    beta_third_quartile?: SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrder
    debt_to_capital_ratio_median?: SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrder
  }

  export type input_statsMinOrderByAggregateInput = {
    industry?: SortOrder
    count?: SortOrder
    revenue_growth_rate_first_quartile?: SortOrder
    revenue_growth_rate_median?: SortOrder
    revenue_growth_rate_third_quartile?: SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrder
    pre_tax_operating_margin_median?: SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrder
    sales_to_invested_capital_first_quartile?: SortOrder
    sales_to_invested_capital_median?: SortOrder
    sales_to_invested_capital_third_quartile?: SortOrder
    cost_of_capital_first_quartile?: SortOrder
    cost_of_capital_median?: SortOrder
    cost_of_capital_third_quartile?: SortOrder
    beta_first_quartile?: SortOrder
    beta_median?: SortOrder
    beta_third_quartile?: SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrder
    debt_to_capital_ratio_median?: SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrder
  }

  export type input_statsSumOrderByAggregateInput = {
    count?: SortOrder
    revenue_growth_rate_first_quartile?: SortOrder
    revenue_growth_rate_median?: SortOrder
    revenue_growth_rate_third_quartile?: SortOrder
    pre_tax_operating_margin_first_quartile?: SortOrder
    pre_tax_operating_margin_median?: SortOrder
    pre_tax_operating_margin_third_quartile?: SortOrder
    sales_to_invested_capital_first_quartile?: SortOrder
    sales_to_invested_capital_median?: SortOrder
    sales_to_invested_capital_third_quartile?: SortOrder
    cost_of_capital_first_quartile?: SortOrder
    cost_of_capital_median?: SortOrder
    cost_of_capital_third_quartile?: SortOrder
    beta_first_quartile?: SortOrder
    beta_median?: SortOrder
    beta_third_quartile?: SortOrder
    debt_to_capital_ratio_first_quartile?: SortOrder
    debt_to_capital_ratio_median?: SortOrder
    debt_to_capital_ratio_third_quartile?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type valuationCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    email?: SortOrder
    inputs?: SortOrder
    fetched_inputs?: SortOrder
    stock_info?: SortOrder
    valuation_model?: SortOrder
    valuation_output?: SortOrder
    implied_share_price?: SortOrder
    description?: SortOrder
    valued_date?: SortOrder
  }

  export type valuationAvgOrderByAggregateInput = {
    id?: SortOrder
    implied_share_price?: SortOrder
    valued_date?: SortOrder
  }

  export type valuationMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    email?: SortOrder
    implied_share_price?: SortOrder
    description?: SortOrder
    valued_date?: SortOrder
  }

  export type valuationMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    email?: SortOrder
    implied_share_price?: SortOrder
    description?: SortOrder
    valued_date?: SortOrder
  }

  export type valuationSumOrderByAggregateInput = {
    id?: SortOrder
    implied_share_price?: SortOrder
    valued_date?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use beta_usDefaultArgs instead
     */
    export type beta_usArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = beta_usDefaultArgs<ExtArgs>
    /**
     * @deprecated Use country_risk_premiumDefaultArgs instead
     */
    export type country_risk_premiumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = country_risk_premiumDefaultArgs<ExtArgs>
    /**
     * @deprecated Use data_last_updateDefaultArgs instead
     */
    export type data_last_updateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = data_last_updateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ebit_growthDefaultArgs instead
     */
    export type ebit_growthArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ebit_growthDefaultArgs<ExtArgs>
    /**
     * @deprecated Use pe_ratio_usDefaultArgs instead
     */
    export type pe_ratio_usArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = pe_ratio_usDefaultArgs<ExtArgs>
    /**
     * @deprecated Use rev_growth_rateDefaultArgs instead
     */
    export type rev_growth_rateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = rev_growth_rateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use sales_to_cap_usDefaultArgs instead
     */
    export type sales_to_cap_usArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = sales_to_cap_usDefaultArgs<ExtArgs>
    /**
     * @deprecated Use effective_tax_rateDefaultArgs instead
     */
    export type effective_tax_rateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = effective_tax_rateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use default_spread_large_firmDefaultArgs instead
     */
    export type default_spread_large_firmArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = default_spread_large_firmDefaultArgs<ExtArgs>
    /**
     * @deprecated Use default_spread_small_firmDefaultArgs instead
     */
    export type default_spread_small_firmArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = default_spread_small_firmDefaultArgs<ExtArgs>
    /**
     * @deprecated Use input_statsDefaultArgs instead
     */
    export type input_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = input_statsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use valuationDefaultArgs instead
     */
    export type valuationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = valuationDefaultArgs<ExtArgs>

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