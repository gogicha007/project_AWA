
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vendor
 * 
 */
export type Vendor = $Result.DefaultSelection<Prisma.$VendorPayload>
/**
 * Model Unit
 * 
 */
export type Unit = $Result.DefaultSelection<Prisma.$UnitPayload>
/**
 * Model MaterialGroup
 * 
 */
export type MaterialGroup = $Result.DefaultSelection<Prisma.$MaterialGroupPayload>
/**
 * Model MaterialType
 * 
 */
export type MaterialType = $Result.DefaultSelection<Prisma.$MaterialTypePayload>
/**
 * Model MaterialName
 * 
 */
export type MaterialName = $Result.DefaultSelection<Prisma.$MaterialNamePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendor.findMany()
    * ```
    */
  get vendor(): Prisma.VendorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unit`: Exposes CRUD operations for the **Unit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Units
    * const units = await prisma.unit.findMany()
    * ```
    */
  get unit(): Prisma.UnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materialGroup`: Exposes CRUD operations for the **MaterialGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialGroups
    * const materialGroups = await prisma.materialGroup.findMany()
    * ```
    */
  get materialGroup(): Prisma.MaterialGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materialType`: Exposes CRUD operations for the **MaterialType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialTypes
    * const materialTypes = await prisma.materialType.findMany()
    * ```
    */
  get materialType(): Prisma.MaterialTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materialName`: Exposes CRUD operations for the **MaterialName** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialNames
    * const materialNames = await prisma.materialName.findMany()
    * ```
    */
  get materialName(): Prisma.MaterialNameDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    User: 'User',
    Vendor: 'Vendor',
    Unit: 'Unit',
    MaterialGroup: 'MaterialGroup',
    MaterialType: 'MaterialType',
    MaterialName: 'MaterialName'
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
      modelProps: "user" | "vendor" | "unit" | "materialGroup" | "materialType" | "materialName"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vendor: {
        payload: Prisma.$VendorPayload<ExtArgs>
        fields: Prisma.VendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findFirst: {
            args: Prisma.VendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findMany: {
            args: Prisma.VendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          create: {
            args: Prisma.VendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          createMany: {
            args: Prisma.VendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          delete: {
            args: Prisma.VendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          update: {
            args: Prisma.VendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          deleteMany: {
            args: Prisma.VendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          upsert: {
            args: Prisma.VendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          aggregate: {
            args: Prisma.VendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendor>
          }
          groupBy: {
            args: Prisma.VendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorCountArgs<ExtArgs>
            result: $Utils.Optional<VendorCountAggregateOutputType> | number
          }
        }
      }
      Unit: {
        payload: Prisma.$UnitPayload<ExtArgs>
        fields: Prisma.UnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findFirst: {
            args: Prisma.UnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findMany: {
            args: Prisma.UnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          create: {
            args: Prisma.UnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          createMany: {
            args: Prisma.UnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          delete: {
            args: Prisma.UnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          update: {
            args: Prisma.UnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          deleteMany: {
            args: Prisma.UnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          upsert: {
            args: Prisma.UnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          aggregate: {
            args: Prisma.UnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnit>
          }
          groupBy: {
            args: Prisma.UnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitCountArgs<ExtArgs>
            result: $Utils.Optional<UnitCountAggregateOutputType> | number
          }
        }
      }
      MaterialGroup: {
        payload: Prisma.$MaterialGroupPayload<ExtArgs>
        fields: Prisma.MaterialGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          findFirst: {
            args: Prisma.MaterialGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          findMany: {
            args: Prisma.MaterialGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>[]
          }
          create: {
            args: Prisma.MaterialGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          createMany: {
            args: Prisma.MaterialGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>[]
          }
          delete: {
            args: Prisma.MaterialGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          update: {
            args: Prisma.MaterialGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          deleteMany: {
            args: Prisma.MaterialGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>[]
          }
          upsert: {
            args: Prisma.MaterialGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialGroupPayload>
          }
          aggregate: {
            args: Prisma.MaterialGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialGroup>
          }
          groupBy: {
            args: Prisma.MaterialGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialGroupCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialGroupCountAggregateOutputType> | number
          }
        }
      }
      MaterialType: {
        payload: Prisma.$MaterialTypePayload<ExtArgs>
        fields: Prisma.MaterialTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          findFirst: {
            args: Prisma.MaterialTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          findMany: {
            args: Prisma.MaterialTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>[]
          }
          create: {
            args: Prisma.MaterialTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          createMany: {
            args: Prisma.MaterialTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>[]
          }
          delete: {
            args: Prisma.MaterialTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          update: {
            args: Prisma.MaterialTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          deleteMany: {
            args: Prisma.MaterialTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>[]
          }
          upsert: {
            args: Prisma.MaterialTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTypePayload>
          }
          aggregate: {
            args: Prisma.MaterialTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialType>
          }
          groupBy: {
            args: Prisma.MaterialTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialTypeCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialTypeCountAggregateOutputType> | number
          }
        }
      }
      MaterialName: {
        payload: Prisma.$MaterialNamePayload<ExtArgs>
        fields: Prisma.MaterialNameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialNameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialNameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          findFirst: {
            args: Prisma.MaterialNameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialNameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          findMany: {
            args: Prisma.MaterialNameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>[]
          }
          create: {
            args: Prisma.MaterialNameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          createMany: {
            args: Prisma.MaterialNameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialNameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>[]
          }
          delete: {
            args: Prisma.MaterialNameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          update: {
            args: Prisma.MaterialNameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          deleteMany: {
            args: Prisma.MaterialNameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialNameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialNameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>[]
          }
          upsert: {
            args: Prisma.MaterialNameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialNamePayload>
          }
          aggregate: {
            args: Prisma.MaterialNameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialName>
          }
          groupBy: {
            args: Prisma.MaterialNameGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialNameGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialNameCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialNameCountAggregateOutputType> | number
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
    user?: UserOmit
    vendor?: VendorOmit
    unit?: UnitOmit
    materialGroup?: MaterialGroupOmit
    materialType?: MaterialTypeOmit
    materialName?: MaterialNameOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Vendor: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vendor?: boolean | UserCountOutputTypeCountVendorArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
  }


  /**
   * Count Type MaterialGroupCountOutputType
   */

  export type MaterialGroupCountOutputType = {
    MaterialType: number
  }

  export type MaterialGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MaterialType?: boolean | MaterialGroupCountOutputTypeCountMaterialTypeArgs
  }

  // Custom InputTypes
  /**
   * MaterialGroupCountOutputType without action
   */
  export type MaterialGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroupCountOutputType
     */
    select?: MaterialGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaterialGroupCountOutputType without action
   */
  export type MaterialGroupCountOutputTypeCountMaterialTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialTypeWhereInput
  }


  /**
   * Count Type MaterialTypeCountOutputType
   */

  export type MaterialTypeCountOutputType = {
    MaterialName: number
  }

  export type MaterialTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MaterialName?: boolean | MaterialTypeCountOutputTypeCountMaterialNameArgs
  }

  // Custom InputTypes
  /**
   * MaterialTypeCountOutputType without action
   */
  export type MaterialTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTypeCountOutputType
     */
    select?: MaterialTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaterialTypeCountOutputType without action
   */
  export type MaterialTypeCountOutputTypeCountMaterialNameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialNameWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firebaseUid: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firebaseUid: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firebaseUid: number
    email: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firebaseUid?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firebaseUid?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firebaseUid?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firebaseUid: string
    email: string
    name: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firebaseUid?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Vendor?: boolean | User$VendorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firebaseUid?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firebaseUid?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firebaseUid?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firebaseUid" | "email" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vendor?: boolean | User$VendorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Vendor: Prisma.$VendorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firebaseUid: string
      email: string
      name: string | null
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Vendor<T extends User$VendorArgs<ExtArgs> = {}>(args?: Subset<T, User$VendorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firebaseUid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Vendor
   */
  export type User$VendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    cursor?: VendorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Vendor
   */

  export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  export type VendorAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type VendorSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type VendorMinAggregateOutputType = {
    id: number | null
    name: string | null
    country: string | null
    userId: number | null
    createdAt: Date | null
  }

  export type VendorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    country: string | null
    userId: number | null
    createdAt: Date | null
  }

  export type VendorCountAggregateOutputType = {
    id: number
    name: number
    country: number
    userId: number
    createdAt: number
    _all: number
  }


  export type VendorAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type VendorSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type VendorMinAggregateInputType = {
    id?: true
    name?: true
    country?: true
    userId?: true
    createdAt?: true
  }

  export type VendorMaxAggregateInputType = {
    id?: true
    name?: true
    country?: true
    userId?: true
    createdAt?: true
  }

  export type VendorCountAggregateInputType = {
    id?: true
    name?: true
    country?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type VendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType
  }

  export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
        [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendor[P]>
      : GetScalarType<T[P], AggregateVendor[P]>
  }




  export type VendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithAggregationInput | VendorOrderByWithAggregationInput[]
    by: VendorScalarFieldEnum[] | VendorScalarFieldEnum
    having?: VendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorCountAggregateInputType | true
    _avg?: VendorAvgAggregateInputType
    _sum?: VendorSumAggregateInputType
    _min?: VendorMinAggregateInputType
    _max?: VendorMaxAggregateInputType
  }

  export type VendorGroupByOutputType = {
    id: number
    name: string
    country: string
    userId: number
    createdAt: Date
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorGroupByOutputType[P]>
            : GetScalarType<T[P], VendorGroupByOutputType[P]>
        }
      >
    >


  export type VendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectScalar = {
    id?: boolean
    name?: boolean
    country?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type VendorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "country" | "userId" | "createdAt", ExtArgs["result"]["vendor"]>
  export type VendorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VendorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VendorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      country: string
      userId: number
      createdAt: Date
    }, ExtArgs["result"]["vendor"]>
    composites: {}
  }

  type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = $Result.GetResult<Prisma.$VendorPayload, S>

  type VendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorCountAggregateInputType | true
    }

  export interface VendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendor'], meta: { name: 'Vendor' } }
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorFindManyArgs>(args?: SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     * 
     */
    create<T extends VendorCreateArgs>(args: SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorCreateManyArgs>(args?: SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     * 
     */
    delete<T extends VendorDeleteArgs>(args: SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorUpdateArgs>(args: SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorUpdateManyArgs>(args: SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(
      args?: Subset<T, VendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VendorAggregateArgs>(args: Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>

    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
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
      T extends VendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorGroupByArgs['orderBy'] }
        : { orderBy?: VendorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendor model
   */
  readonly fields: VendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Vendor model
   */
  interface VendorFieldRefs {
    readonly id: FieldRef<"Vendor", 'Int'>
    readonly name: FieldRef<"Vendor", 'String'>
    readonly country: FieldRef<"Vendor", 'String'>
    readonly userId: FieldRef<"Vendor", 'Int'>
    readonly createdAt: FieldRef<"Vendor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vendor findUnique
   */
  export type VendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findUniqueOrThrow
   */
  export type VendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findFirst
   */
  export type VendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findFirstOrThrow
   */
  export type VendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findMany
   */
  export type VendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor create
   */
  export type VendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to create a Vendor.
     */
    data: XOR<VendorCreateInput, VendorUncheckedCreateInput>
  }

  /**
   * Vendor createMany
   */
  export type VendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendor createManyAndReturn
   */
  export type VendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vendor update
   */
  export type VendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to update a Vendor.
     */
    data: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
    /**
     * Choose, which Vendor to update.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor updateMany
   */
  export type VendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor updateManyAndReturn
   */
  export type VendorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vendor upsert
   */
  export type VendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: VendorWhereUniqueInput
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: XOR<VendorCreateInput, VendorUncheckedCreateInput>
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
  }

  /**
   * Vendor delete
   */
  export type VendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter which Vendor to delete.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor deleteMany
   */
  export type VendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number
  }

  /**
   * Vendor without action
   */
  export type VendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
  }


  /**
   * Model Unit
   */

  export type AggregateUnit = {
    _count: UnitCountAggregateOutputType | null
    _avg: UnitAvgAggregateOutputType | null
    _sum: UnitSumAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  export type UnitAvgAggregateOutputType = {
    id: number | null
  }

  export type UnitSumAggregateOutputType = {
    id: number | null
  }

  export type UnitMinAggregateOutputType = {
    id: number | null
    unit: string | null
  }

  export type UnitMaxAggregateOutputType = {
    id: number | null
    unit: string | null
  }

  export type UnitCountAggregateOutputType = {
    id: number
    unit: number
    _all: number
  }


  export type UnitAvgAggregateInputType = {
    id?: true
  }

  export type UnitSumAggregateInputType = {
    id?: true
  }

  export type UnitMinAggregateInputType = {
    id?: true
    unit?: true
  }

  export type UnitMaxAggregateInputType = {
    id?: true
    unit?: true
  }

  export type UnitCountAggregateInputType = {
    id?: true
    unit?: true
    _all?: true
  }

  export type UnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unit to aggregate.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Units
    **/
    _count?: true | UnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UnitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UnitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitMaxAggregateInputType
  }

  export type GetUnitAggregateType<T extends UnitAggregateArgs> = {
        [P in keyof T & keyof AggregateUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnit[P]>
      : GetScalarType<T[P], AggregateUnit[P]>
  }




  export type UnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithAggregationInput | UnitOrderByWithAggregationInput[]
    by: UnitScalarFieldEnum[] | UnitScalarFieldEnum
    having?: UnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitCountAggregateInputType | true
    _avg?: UnitAvgAggregateInputType
    _sum?: UnitSumAggregateInputType
    _min?: UnitMinAggregateInputType
    _max?: UnitMaxAggregateInputType
  }

  export type UnitGroupByOutputType = {
    id: number
    unit: string
    _count: UnitCountAggregateOutputType | null
    _avg: UnitAvgAggregateOutputType | null
    _sum: UnitSumAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  type GetUnitGroupByPayload<T extends UnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitGroupByOutputType[P]>
            : GetScalarType<T[P], UnitGroupByOutputType[P]>
        }
      >
    >


  export type UnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unit?: boolean
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unit?: boolean
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unit?: boolean
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectScalar = {
    id?: boolean
    unit?: boolean
  }

  export type UnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "unit", ExtArgs["result"]["unit"]>

  export type $UnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Unit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      unit: string
    }, ExtArgs["result"]["unit"]>
    composites: {}
  }

  type UnitGetPayload<S extends boolean | null | undefined | UnitDefaultArgs> = $Result.GetResult<Prisma.$UnitPayload, S>

  type UnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnitCountAggregateInputType | true
    }

  export interface UnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Unit'], meta: { name: 'Unit' } }
    /**
     * Find zero or one Unit that matches the filter.
     * @param {UnitFindUniqueArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitFindUniqueArgs>(args: SelectSubset<T, UnitFindUniqueArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitFindUniqueOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitFindFirstArgs>(args?: SelectSubset<T, UnitFindFirstArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Units that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Units
     * const units = await prisma.unit.findMany()
     * 
     * // Get first 10 Units
     * const units = await prisma.unit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitWithIdOnly = await prisma.unit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitFindManyArgs>(args?: SelectSubset<T, UnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unit.
     * @param {UnitCreateArgs} args - Arguments to create a Unit.
     * @example
     * // Create one Unit
     * const Unit = await prisma.unit.create({
     *   data: {
     *     // ... data to create a Unit
     *   }
     * })
     * 
     */
    create<T extends UnitCreateArgs>(args: SelectSubset<T, UnitCreateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Units.
     * @param {UnitCreateManyArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitCreateManyArgs>(args?: SelectSubset<T, UnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Units and returns the data saved in the database.
     * @param {UnitCreateManyAndReturnArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UnitCreateManyAndReturnArgs>(args?: SelectSubset<T, UnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unit.
     * @param {UnitDeleteArgs} args - Arguments to delete one Unit.
     * @example
     * // Delete one Unit
     * const Unit = await prisma.unit.delete({
     *   where: {
     *     // ... filter to delete one Unit
     *   }
     * })
     * 
     */
    delete<T extends UnitDeleteArgs>(args: SelectSubset<T, UnitDeleteArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unit.
     * @param {UnitUpdateArgs} args - Arguments to update one Unit.
     * @example
     * // Update one Unit
     * const unit = await prisma.unit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitUpdateArgs>(args: SelectSubset<T, UnitUpdateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Units.
     * @param {UnitDeleteManyArgs} args - Arguments to filter Units to delete.
     * @example
     * // Delete a few Units
     * const { count } = await prisma.unit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitDeleteManyArgs>(args?: SelectSubset<T, UnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitUpdateManyArgs>(args: SelectSubset<T, UnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units and returns the data updated in the database.
     * @param {UnitUpdateManyAndReturnArgs} args - Arguments to update many Units.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UnitUpdateManyAndReturnArgs>(args: SelectSubset<T, UnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unit.
     * @param {UnitUpsertArgs} args - Arguments to update or create a Unit.
     * @example
     * // Update or create a Unit
     * const unit = await prisma.unit.upsert({
     *   create: {
     *     // ... data to create a Unit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unit we want to update
     *   }
     * })
     */
    upsert<T extends UnitUpsertArgs>(args: SelectSubset<T, UnitUpsertArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitCountArgs} args - Arguments to filter Units to count.
     * @example
     * // Count the number of Units
     * const count = await prisma.unit.count({
     *   where: {
     *     // ... the filter for the Units we want to count
     *   }
     * })
    **/
    count<T extends UnitCountArgs>(
      args?: Subset<T, UnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UnitAggregateArgs>(args: Subset<T, UnitAggregateArgs>): Prisma.PrismaPromise<GetUnitAggregateType<T>>

    /**
     * Group by Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitGroupByArgs} args - Group by arguments.
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
      T extends UnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitGroupByArgs['orderBy'] }
        : { orderBy?: UnitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Unit model
   */
  readonly fields: UnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Unit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Unit model
   */
  interface UnitFieldRefs {
    readonly id: FieldRef<"Unit", 'Int'>
    readonly unit: FieldRef<"Unit", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Unit findUnique
   */
  export type UnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findUniqueOrThrow
   */
  export type UnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findFirst
   */
  export type UnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findFirstOrThrow
   */
  export type UnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findMany
   */
  export type UnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter, which Units to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit create
   */
  export type UnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data needed to create a Unit.
     */
    data: XOR<UnitCreateInput, UnitUncheckedCreateInput>
  }

  /**
   * Unit createMany
   */
  export type UnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Unit createManyAndReturn
   */
  export type UnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Unit update
   */
  export type UnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data needed to update a Unit.
     */
    data: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
    /**
     * Choose, which Unit to update.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit updateMany
   */
  export type UnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
  }

  /**
   * Unit updateManyAndReturn
   */
  export type UnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
  }

  /**
   * Unit upsert
   */
  export type UnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The filter to search for the Unit to update in case it exists.
     */
    where: UnitWhereUniqueInput
    /**
     * In case the Unit found by the `where` argument doesn't exist, create a new Unit with this data.
     */
    create: XOR<UnitCreateInput, UnitUncheckedCreateInput>
    /**
     * In case the Unit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
  }

  /**
   * Unit delete
   */
  export type UnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Filter which Unit to delete.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit deleteMany
   */
  export type UnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Units to delete
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to delete.
     */
    limit?: number
  }

  /**
   * Unit without action
   */
  export type UnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
  }


  /**
   * Model MaterialGroup
   */

  export type AggregateMaterialGroup = {
    _count: MaterialGroupCountAggregateOutputType | null
    _avg: MaterialGroupAvgAggregateOutputType | null
    _sum: MaterialGroupSumAggregateOutputType | null
    _min: MaterialGroupMinAggregateOutputType | null
    _max: MaterialGroupMaxAggregateOutputType | null
  }

  export type MaterialGroupAvgAggregateOutputType = {
    id: number | null
  }

  export type MaterialGroupSumAggregateOutputType = {
    id: number | null
  }

  export type MaterialGroupMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type MaterialGroupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type MaterialGroupCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type MaterialGroupAvgAggregateInputType = {
    id?: true
  }

  export type MaterialGroupSumAggregateInputType = {
    id?: true
  }

  export type MaterialGroupMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type MaterialGroupMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type MaterialGroupCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type MaterialGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialGroup to aggregate.
     */
    where?: MaterialGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialGroups to fetch.
     */
    orderBy?: MaterialGroupOrderByWithRelationInput | MaterialGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialGroups
    **/
    _count?: true | MaterialGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialGroupMaxAggregateInputType
  }

  export type GetMaterialGroupAggregateType<T extends MaterialGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialGroup[P]>
      : GetScalarType<T[P], AggregateMaterialGroup[P]>
  }




  export type MaterialGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialGroupWhereInput
    orderBy?: MaterialGroupOrderByWithAggregationInput | MaterialGroupOrderByWithAggregationInput[]
    by: MaterialGroupScalarFieldEnum[] | MaterialGroupScalarFieldEnum
    having?: MaterialGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialGroupCountAggregateInputType | true
    _avg?: MaterialGroupAvgAggregateInputType
    _sum?: MaterialGroupSumAggregateInputType
    _min?: MaterialGroupMinAggregateInputType
    _max?: MaterialGroupMaxAggregateInputType
  }

  export type MaterialGroupGroupByOutputType = {
    id: number
    name: string
    description: string
    _count: MaterialGroupCountAggregateOutputType | null
    _avg: MaterialGroupAvgAggregateOutputType | null
    _sum: MaterialGroupSumAggregateOutputType | null
    _min: MaterialGroupMinAggregateOutputType | null
    _max: MaterialGroupMaxAggregateOutputType | null
  }

  type GetMaterialGroupGroupByPayload<T extends MaterialGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialGroupGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialGroupGroupByOutputType[P]>
        }
      >
    >


  export type MaterialGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    MaterialType?: boolean | MaterialGroup$MaterialTypeArgs<ExtArgs>
    _count?: boolean | MaterialGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialGroup"]>

  export type MaterialGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["materialGroup"]>

  export type MaterialGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["materialGroup"]>

  export type MaterialGroupSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type MaterialGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["materialGroup"]>
  export type MaterialGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MaterialType?: boolean | MaterialGroup$MaterialTypeArgs<ExtArgs>
    _count?: boolean | MaterialGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MaterialGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MaterialGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MaterialGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialGroup"
    objects: {
      MaterialType: Prisma.$MaterialTypePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
    }, ExtArgs["result"]["materialGroup"]>
    composites: {}
  }

  type MaterialGroupGetPayload<S extends boolean | null | undefined | MaterialGroupDefaultArgs> = $Result.GetResult<Prisma.$MaterialGroupPayload, S>

  type MaterialGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialGroupCountAggregateInputType | true
    }

  export interface MaterialGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialGroup'], meta: { name: 'MaterialGroup' } }
    /**
     * Find zero or one MaterialGroup that matches the filter.
     * @param {MaterialGroupFindUniqueArgs} args - Arguments to find a MaterialGroup
     * @example
     * // Get one MaterialGroup
     * const materialGroup = await prisma.materialGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialGroupFindUniqueArgs>(args: SelectSubset<T, MaterialGroupFindUniqueArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialGroupFindUniqueOrThrowArgs} args - Arguments to find a MaterialGroup
     * @example
     * // Get one MaterialGroup
     * const materialGroup = await prisma.materialGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupFindFirstArgs} args - Arguments to find a MaterialGroup
     * @example
     * // Get one MaterialGroup
     * const materialGroup = await prisma.materialGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialGroupFindFirstArgs>(args?: SelectSubset<T, MaterialGroupFindFirstArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupFindFirstOrThrowArgs} args - Arguments to find a MaterialGroup
     * @example
     * // Get one MaterialGroup
     * const materialGroup = await prisma.materialGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialGroups
     * const materialGroups = await prisma.materialGroup.findMany()
     * 
     * // Get first 10 MaterialGroups
     * const materialGroups = await prisma.materialGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialGroupWithIdOnly = await prisma.materialGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialGroupFindManyArgs>(args?: SelectSubset<T, MaterialGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialGroup.
     * @param {MaterialGroupCreateArgs} args - Arguments to create a MaterialGroup.
     * @example
     * // Create one MaterialGroup
     * const MaterialGroup = await prisma.materialGroup.create({
     *   data: {
     *     // ... data to create a MaterialGroup
     *   }
     * })
     * 
     */
    create<T extends MaterialGroupCreateArgs>(args: SelectSubset<T, MaterialGroupCreateArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialGroups.
     * @param {MaterialGroupCreateManyArgs} args - Arguments to create many MaterialGroups.
     * @example
     * // Create many MaterialGroups
     * const materialGroup = await prisma.materialGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialGroupCreateManyArgs>(args?: SelectSubset<T, MaterialGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialGroups and returns the data saved in the database.
     * @param {MaterialGroupCreateManyAndReturnArgs} args - Arguments to create many MaterialGroups.
     * @example
     * // Create many MaterialGroups
     * const materialGroup = await prisma.materialGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialGroups and only return the `id`
     * const materialGroupWithIdOnly = await prisma.materialGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialGroup.
     * @param {MaterialGroupDeleteArgs} args - Arguments to delete one MaterialGroup.
     * @example
     * // Delete one MaterialGroup
     * const MaterialGroup = await prisma.materialGroup.delete({
     *   where: {
     *     // ... filter to delete one MaterialGroup
     *   }
     * })
     * 
     */
    delete<T extends MaterialGroupDeleteArgs>(args: SelectSubset<T, MaterialGroupDeleteArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialGroup.
     * @param {MaterialGroupUpdateArgs} args - Arguments to update one MaterialGroup.
     * @example
     * // Update one MaterialGroup
     * const materialGroup = await prisma.materialGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialGroupUpdateArgs>(args: SelectSubset<T, MaterialGroupUpdateArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialGroups.
     * @param {MaterialGroupDeleteManyArgs} args - Arguments to filter MaterialGroups to delete.
     * @example
     * // Delete a few MaterialGroups
     * const { count } = await prisma.materialGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialGroupDeleteManyArgs>(args?: SelectSubset<T, MaterialGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialGroups
     * const materialGroup = await prisma.materialGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialGroupUpdateManyArgs>(args: SelectSubset<T, MaterialGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialGroups and returns the data updated in the database.
     * @param {MaterialGroupUpdateManyAndReturnArgs} args - Arguments to update many MaterialGroups.
     * @example
     * // Update many MaterialGroups
     * const materialGroup = await prisma.materialGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialGroups and only return the `id`
     * const materialGroupWithIdOnly = await prisma.materialGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialGroup.
     * @param {MaterialGroupUpsertArgs} args - Arguments to update or create a MaterialGroup.
     * @example
     * // Update or create a MaterialGroup
     * const materialGroup = await prisma.materialGroup.upsert({
     *   create: {
     *     // ... data to create a MaterialGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialGroup we want to update
     *   }
     * })
     */
    upsert<T extends MaterialGroupUpsertArgs>(args: SelectSubset<T, MaterialGroupUpsertArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupCountArgs} args - Arguments to filter MaterialGroups to count.
     * @example
     * // Count the number of MaterialGroups
     * const count = await prisma.materialGroup.count({
     *   where: {
     *     // ... the filter for the MaterialGroups we want to count
     *   }
     * })
    **/
    count<T extends MaterialGroupCountArgs>(
      args?: Subset<T, MaterialGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialGroupAggregateArgs>(args: Subset<T, MaterialGroupAggregateArgs>): Prisma.PrismaPromise<GetMaterialGroupAggregateType<T>>

    /**
     * Group by MaterialGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupGroupByArgs} args - Group by arguments.
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
      T extends MaterialGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialGroupGroupByArgs['orderBy'] }
        : { orderBy?: MaterialGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaterialGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialGroup model
   */
  readonly fields: MaterialGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    MaterialType<T extends MaterialGroup$MaterialTypeArgs<ExtArgs> = {}>(args?: Subset<T, MaterialGroup$MaterialTypeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MaterialGroup model
   */
  interface MaterialGroupFieldRefs {
    readonly id: FieldRef<"MaterialGroup", 'Int'>
    readonly name: FieldRef<"MaterialGroup", 'String'>
    readonly description: FieldRef<"MaterialGroup", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MaterialGroup findUnique
   */
  export type MaterialGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter, which MaterialGroup to fetch.
     */
    where: MaterialGroupWhereUniqueInput
  }

  /**
   * MaterialGroup findUniqueOrThrow
   */
  export type MaterialGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter, which MaterialGroup to fetch.
     */
    where: MaterialGroupWhereUniqueInput
  }

  /**
   * MaterialGroup findFirst
   */
  export type MaterialGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter, which MaterialGroup to fetch.
     */
    where?: MaterialGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialGroups to fetch.
     */
    orderBy?: MaterialGroupOrderByWithRelationInput | MaterialGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialGroups.
     */
    cursor?: MaterialGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialGroups.
     */
    distinct?: MaterialGroupScalarFieldEnum | MaterialGroupScalarFieldEnum[]
  }

  /**
   * MaterialGroup findFirstOrThrow
   */
  export type MaterialGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter, which MaterialGroup to fetch.
     */
    where?: MaterialGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialGroups to fetch.
     */
    orderBy?: MaterialGroupOrderByWithRelationInput | MaterialGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialGroups.
     */
    cursor?: MaterialGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialGroups.
     */
    distinct?: MaterialGroupScalarFieldEnum | MaterialGroupScalarFieldEnum[]
  }

  /**
   * MaterialGroup findMany
   */
  export type MaterialGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter, which MaterialGroups to fetch.
     */
    where?: MaterialGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialGroups to fetch.
     */
    orderBy?: MaterialGroupOrderByWithRelationInput | MaterialGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialGroups.
     */
    cursor?: MaterialGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialGroups.
     */
    skip?: number
    distinct?: MaterialGroupScalarFieldEnum | MaterialGroupScalarFieldEnum[]
  }

  /**
   * MaterialGroup create
   */
  export type MaterialGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialGroup.
     */
    data: XOR<MaterialGroupCreateInput, MaterialGroupUncheckedCreateInput>
  }

  /**
   * MaterialGroup createMany
   */
  export type MaterialGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialGroups.
     */
    data: MaterialGroupCreateManyInput | MaterialGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialGroup createManyAndReturn
   */
  export type MaterialGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialGroups.
     */
    data: MaterialGroupCreateManyInput | MaterialGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialGroup update
   */
  export type MaterialGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialGroup.
     */
    data: XOR<MaterialGroupUpdateInput, MaterialGroupUncheckedUpdateInput>
    /**
     * Choose, which MaterialGroup to update.
     */
    where: MaterialGroupWhereUniqueInput
  }

  /**
   * MaterialGroup updateMany
   */
  export type MaterialGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialGroups.
     */
    data: XOR<MaterialGroupUpdateManyMutationInput, MaterialGroupUncheckedUpdateManyInput>
    /**
     * Filter which MaterialGroups to update
     */
    where?: MaterialGroupWhereInput
    /**
     * Limit how many MaterialGroups to update.
     */
    limit?: number
  }

  /**
   * MaterialGroup updateManyAndReturn
   */
  export type MaterialGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * The data used to update MaterialGroups.
     */
    data: XOR<MaterialGroupUpdateManyMutationInput, MaterialGroupUncheckedUpdateManyInput>
    /**
     * Filter which MaterialGroups to update
     */
    where?: MaterialGroupWhereInput
    /**
     * Limit how many MaterialGroups to update.
     */
    limit?: number
  }

  /**
   * MaterialGroup upsert
   */
  export type MaterialGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialGroup to update in case it exists.
     */
    where: MaterialGroupWhereUniqueInput
    /**
     * In case the MaterialGroup found by the `where` argument doesn't exist, create a new MaterialGroup with this data.
     */
    create: XOR<MaterialGroupCreateInput, MaterialGroupUncheckedCreateInput>
    /**
     * In case the MaterialGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialGroupUpdateInput, MaterialGroupUncheckedUpdateInput>
  }

  /**
   * MaterialGroup delete
   */
  export type MaterialGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
    /**
     * Filter which MaterialGroup to delete.
     */
    where: MaterialGroupWhereUniqueInput
  }

  /**
   * MaterialGroup deleteMany
   */
  export type MaterialGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialGroups to delete
     */
    where?: MaterialGroupWhereInput
    /**
     * Limit how many MaterialGroups to delete.
     */
    limit?: number
  }

  /**
   * MaterialGroup.MaterialType
   */
  export type MaterialGroup$MaterialTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    where?: MaterialTypeWhereInput
    orderBy?: MaterialTypeOrderByWithRelationInput | MaterialTypeOrderByWithRelationInput[]
    cursor?: MaterialTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialTypeScalarFieldEnum | MaterialTypeScalarFieldEnum[]
  }

  /**
   * MaterialGroup without action
   */
  export type MaterialGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialGroup
     */
    select?: MaterialGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialGroup
     */
    omit?: MaterialGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialGroupInclude<ExtArgs> | null
  }


  /**
   * Model MaterialType
   */

  export type AggregateMaterialType = {
    _count: MaterialTypeCountAggregateOutputType | null
    _avg: MaterialTypeAvgAggregateOutputType | null
    _sum: MaterialTypeSumAggregateOutputType | null
    _min: MaterialTypeMinAggregateOutputType | null
    _max: MaterialTypeMaxAggregateOutputType | null
  }

  export type MaterialTypeAvgAggregateOutputType = {
    id: number | null
    groupId: number | null
  }

  export type MaterialTypeSumAggregateOutputType = {
    id: number | null
    groupId: number | null
  }

  export type MaterialTypeMinAggregateOutputType = {
    id: number | null
    type: string | null
    groupId: number | null
  }

  export type MaterialTypeMaxAggregateOutputType = {
    id: number | null
    type: string | null
    groupId: number | null
  }

  export type MaterialTypeCountAggregateOutputType = {
    id: number
    type: number
    groupId: number
    _all: number
  }


  export type MaterialTypeAvgAggregateInputType = {
    id?: true
    groupId?: true
  }

  export type MaterialTypeSumAggregateInputType = {
    id?: true
    groupId?: true
  }

  export type MaterialTypeMinAggregateInputType = {
    id?: true
    type?: true
    groupId?: true
  }

  export type MaterialTypeMaxAggregateInputType = {
    id?: true
    type?: true
    groupId?: true
  }

  export type MaterialTypeCountAggregateInputType = {
    id?: true
    type?: true
    groupId?: true
    _all?: true
  }

  export type MaterialTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialType to aggregate.
     */
    where?: MaterialTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTypes to fetch.
     */
    orderBy?: MaterialTypeOrderByWithRelationInput | MaterialTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialTypes
    **/
    _count?: true | MaterialTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialTypeMaxAggregateInputType
  }

  export type GetMaterialTypeAggregateType<T extends MaterialTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialType[P]>
      : GetScalarType<T[P], AggregateMaterialType[P]>
  }




  export type MaterialTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialTypeWhereInput
    orderBy?: MaterialTypeOrderByWithAggregationInput | MaterialTypeOrderByWithAggregationInput[]
    by: MaterialTypeScalarFieldEnum[] | MaterialTypeScalarFieldEnum
    having?: MaterialTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialTypeCountAggregateInputType | true
    _avg?: MaterialTypeAvgAggregateInputType
    _sum?: MaterialTypeSumAggregateInputType
    _min?: MaterialTypeMinAggregateInputType
    _max?: MaterialTypeMaxAggregateInputType
  }

  export type MaterialTypeGroupByOutputType = {
    id: number
    type: string
    groupId: number
    _count: MaterialTypeCountAggregateOutputType | null
    _avg: MaterialTypeAvgAggregateOutputType | null
    _sum: MaterialTypeSumAggregateOutputType | null
    _min: MaterialTypeMinAggregateOutputType | null
    _max: MaterialTypeMaxAggregateOutputType | null
  }

  type GetMaterialTypeGroupByPayload<T extends MaterialTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialTypeGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialTypeGroupByOutputType[P]>
        }
      >
    >


  export type MaterialTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    groupId?: boolean
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
    MaterialName?: boolean | MaterialType$MaterialNameArgs<ExtArgs>
    _count?: boolean | MaterialTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialType"]>

  export type MaterialTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    groupId?: boolean
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialType"]>

  export type MaterialTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    groupId?: boolean
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialType"]>

  export type MaterialTypeSelectScalar = {
    id?: boolean
    type?: boolean
    groupId?: boolean
  }

  export type MaterialTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "groupId", ExtArgs["result"]["materialType"]>
  export type MaterialTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
    MaterialName?: boolean | MaterialType$MaterialNameArgs<ExtArgs>
    _count?: boolean | MaterialTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MaterialTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
  }
  export type MaterialTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MaterialGroupDefaultArgs<ExtArgs>
  }

  export type $MaterialTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialType"
    objects: {
      group: Prisma.$MaterialGroupPayload<ExtArgs>
      MaterialName: Prisma.$MaterialNamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      groupId: number
    }, ExtArgs["result"]["materialType"]>
    composites: {}
  }

  type MaterialTypeGetPayload<S extends boolean | null | undefined | MaterialTypeDefaultArgs> = $Result.GetResult<Prisma.$MaterialTypePayload, S>

  type MaterialTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialTypeCountAggregateInputType | true
    }

  export interface MaterialTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialType'], meta: { name: 'MaterialType' } }
    /**
     * Find zero or one MaterialType that matches the filter.
     * @param {MaterialTypeFindUniqueArgs} args - Arguments to find a MaterialType
     * @example
     * // Get one MaterialType
     * const materialType = await prisma.materialType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialTypeFindUniqueArgs>(args: SelectSubset<T, MaterialTypeFindUniqueArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialTypeFindUniqueOrThrowArgs} args - Arguments to find a MaterialType
     * @example
     * // Get one MaterialType
     * const materialType = await prisma.materialType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeFindFirstArgs} args - Arguments to find a MaterialType
     * @example
     * // Get one MaterialType
     * const materialType = await prisma.materialType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialTypeFindFirstArgs>(args?: SelectSubset<T, MaterialTypeFindFirstArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeFindFirstOrThrowArgs} args - Arguments to find a MaterialType
     * @example
     * // Get one MaterialType
     * const materialType = await prisma.materialType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialTypes
     * const materialTypes = await prisma.materialType.findMany()
     * 
     * // Get first 10 MaterialTypes
     * const materialTypes = await prisma.materialType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialTypeWithIdOnly = await prisma.materialType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialTypeFindManyArgs>(args?: SelectSubset<T, MaterialTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialType.
     * @param {MaterialTypeCreateArgs} args - Arguments to create a MaterialType.
     * @example
     * // Create one MaterialType
     * const MaterialType = await prisma.materialType.create({
     *   data: {
     *     // ... data to create a MaterialType
     *   }
     * })
     * 
     */
    create<T extends MaterialTypeCreateArgs>(args: SelectSubset<T, MaterialTypeCreateArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialTypes.
     * @param {MaterialTypeCreateManyArgs} args - Arguments to create many MaterialTypes.
     * @example
     * // Create many MaterialTypes
     * const materialType = await prisma.materialType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialTypeCreateManyArgs>(args?: SelectSubset<T, MaterialTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialTypes and returns the data saved in the database.
     * @param {MaterialTypeCreateManyAndReturnArgs} args - Arguments to create many MaterialTypes.
     * @example
     * // Create many MaterialTypes
     * const materialType = await prisma.materialType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialTypes and only return the `id`
     * const materialTypeWithIdOnly = await prisma.materialType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialType.
     * @param {MaterialTypeDeleteArgs} args - Arguments to delete one MaterialType.
     * @example
     * // Delete one MaterialType
     * const MaterialType = await prisma.materialType.delete({
     *   where: {
     *     // ... filter to delete one MaterialType
     *   }
     * })
     * 
     */
    delete<T extends MaterialTypeDeleteArgs>(args: SelectSubset<T, MaterialTypeDeleteArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialType.
     * @param {MaterialTypeUpdateArgs} args - Arguments to update one MaterialType.
     * @example
     * // Update one MaterialType
     * const materialType = await prisma.materialType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialTypeUpdateArgs>(args: SelectSubset<T, MaterialTypeUpdateArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialTypes.
     * @param {MaterialTypeDeleteManyArgs} args - Arguments to filter MaterialTypes to delete.
     * @example
     * // Delete a few MaterialTypes
     * const { count } = await prisma.materialType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialTypeDeleteManyArgs>(args?: SelectSubset<T, MaterialTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialTypes
     * const materialType = await prisma.materialType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialTypeUpdateManyArgs>(args: SelectSubset<T, MaterialTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialTypes and returns the data updated in the database.
     * @param {MaterialTypeUpdateManyAndReturnArgs} args - Arguments to update many MaterialTypes.
     * @example
     * // Update many MaterialTypes
     * const materialType = await prisma.materialType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialTypes and only return the `id`
     * const materialTypeWithIdOnly = await prisma.materialType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialType.
     * @param {MaterialTypeUpsertArgs} args - Arguments to update or create a MaterialType.
     * @example
     * // Update or create a MaterialType
     * const materialType = await prisma.materialType.upsert({
     *   create: {
     *     // ... data to create a MaterialType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialType we want to update
     *   }
     * })
     */
    upsert<T extends MaterialTypeUpsertArgs>(args: SelectSubset<T, MaterialTypeUpsertArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeCountArgs} args - Arguments to filter MaterialTypes to count.
     * @example
     * // Count the number of MaterialTypes
     * const count = await prisma.materialType.count({
     *   where: {
     *     // ... the filter for the MaterialTypes we want to count
     *   }
     * })
    **/
    count<T extends MaterialTypeCountArgs>(
      args?: Subset<T, MaterialTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialTypeAggregateArgs>(args: Subset<T, MaterialTypeAggregateArgs>): Prisma.PrismaPromise<GetMaterialTypeAggregateType<T>>

    /**
     * Group by MaterialType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTypeGroupByArgs} args - Group by arguments.
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
      T extends MaterialTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialTypeGroupByArgs['orderBy'] }
        : { orderBy?: MaterialTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaterialTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialType model
   */
  readonly fields: MaterialTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends MaterialGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialGroupDefaultArgs<ExtArgs>>): Prisma__MaterialGroupClient<$Result.GetResult<Prisma.$MaterialGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    MaterialName<T extends MaterialType$MaterialNameArgs<ExtArgs> = {}>(args?: Subset<T, MaterialType$MaterialNameArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MaterialType model
   */
  interface MaterialTypeFieldRefs {
    readonly id: FieldRef<"MaterialType", 'Int'>
    readonly type: FieldRef<"MaterialType", 'String'>
    readonly groupId: FieldRef<"MaterialType", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MaterialType findUnique
   */
  export type MaterialTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter, which MaterialType to fetch.
     */
    where: MaterialTypeWhereUniqueInput
  }

  /**
   * MaterialType findUniqueOrThrow
   */
  export type MaterialTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter, which MaterialType to fetch.
     */
    where: MaterialTypeWhereUniqueInput
  }

  /**
   * MaterialType findFirst
   */
  export type MaterialTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter, which MaterialType to fetch.
     */
    where?: MaterialTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTypes to fetch.
     */
    orderBy?: MaterialTypeOrderByWithRelationInput | MaterialTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialTypes.
     */
    cursor?: MaterialTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialTypes.
     */
    distinct?: MaterialTypeScalarFieldEnum | MaterialTypeScalarFieldEnum[]
  }

  /**
   * MaterialType findFirstOrThrow
   */
  export type MaterialTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter, which MaterialType to fetch.
     */
    where?: MaterialTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTypes to fetch.
     */
    orderBy?: MaterialTypeOrderByWithRelationInput | MaterialTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialTypes.
     */
    cursor?: MaterialTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialTypes.
     */
    distinct?: MaterialTypeScalarFieldEnum | MaterialTypeScalarFieldEnum[]
  }

  /**
   * MaterialType findMany
   */
  export type MaterialTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTypes to fetch.
     */
    where?: MaterialTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTypes to fetch.
     */
    orderBy?: MaterialTypeOrderByWithRelationInput | MaterialTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialTypes.
     */
    cursor?: MaterialTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTypes.
     */
    skip?: number
    distinct?: MaterialTypeScalarFieldEnum | MaterialTypeScalarFieldEnum[]
  }

  /**
   * MaterialType create
   */
  export type MaterialTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialType.
     */
    data: XOR<MaterialTypeCreateInput, MaterialTypeUncheckedCreateInput>
  }

  /**
   * MaterialType createMany
   */
  export type MaterialTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialTypes.
     */
    data: MaterialTypeCreateManyInput | MaterialTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialType createManyAndReturn
   */
  export type MaterialTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialTypes.
     */
    data: MaterialTypeCreateManyInput | MaterialTypeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialType update
   */
  export type MaterialTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialType.
     */
    data: XOR<MaterialTypeUpdateInput, MaterialTypeUncheckedUpdateInput>
    /**
     * Choose, which MaterialType to update.
     */
    where: MaterialTypeWhereUniqueInput
  }

  /**
   * MaterialType updateMany
   */
  export type MaterialTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialTypes.
     */
    data: XOR<MaterialTypeUpdateManyMutationInput, MaterialTypeUncheckedUpdateManyInput>
    /**
     * Filter which MaterialTypes to update
     */
    where?: MaterialTypeWhereInput
    /**
     * Limit how many MaterialTypes to update.
     */
    limit?: number
  }

  /**
   * MaterialType updateManyAndReturn
   */
  export type MaterialTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * The data used to update MaterialTypes.
     */
    data: XOR<MaterialTypeUpdateManyMutationInput, MaterialTypeUncheckedUpdateManyInput>
    /**
     * Filter which MaterialTypes to update
     */
    where?: MaterialTypeWhereInput
    /**
     * Limit how many MaterialTypes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialType upsert
   */
  export type MaterialTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialType to update in case it exists.
     */
    where: MaterialTypeWhereUniqueInput
    /**
     * In case the MaterialType found by the `where` argument doesn't exist, create a new MaterialType with this data.
     */
    create: XOR<MaterialTypeCreateInput, MaterialTypeUncheckedCreateInput>
    /**
     * In case the MaterialType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialTypeUpdateInput, MaterialTypeUncheckedUpdateInput>
  }

  /**
   * MaterialType delete
   */
  export type MaterialTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
    /**
     * Filter which MaterialType to delete.
     */
    where: MaterialTypeWhereUniqueInput
  }

  /**
   * MaterialType deleteMany
   */
  export type MaterialTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialTypes to delete
     */
    where?: MaterialTypeWhereInput
    /**
     * Limit how many MaterialTypes to delete.
     */
    limit?: number
  }

  /**
   * MaterialType.MaterialName
   */
  export type MaterialType$MaterialNameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    where?: MaterialNameWhereInput
    orderBy?: MaterialNameOrderByWithRelationInput | MaterialNameOrderByWithRelationInput[]
    cursor?: MaterialNameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialNameScalarFieldEnum | MaterialNameScalarFieldEnum[]
  }

  /**
   * MaterialType without action
   */
  export type MaterialTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialType
     */
    select?: MaterialTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialType
     */
    omit?: MaterialTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTypeInclude<ExtArgs> | null
  }


  /**
   * Model MaterialName
   */

  export type AggregateMaterialName = {
    _count: MaterialNameCountAggregateOutputType | null
    _avg: MaterialNameAvgAggregateOutputType | null
    _sum: MaterialNameSumAggregateOutputType | null
    _min: MaterialNameMinAggregateOutputType | null
    _max: MaterialNameMaxAggregateOutputType | null
  }

  export type MaterialNameAvgAggregateOutputType = {
    id: number | null
    degree: number | null
    typeId: number | null
  }

  export type MaterialNameSumAggregateOutputType = {
    id: number | null
    degree: number | null
    typeId: number | null
  }

  export type MaterialNameMinAggregateOutputType = {
    id: number | null
    name: string | null
    dn: string | null
    pn: string | null
    degree: number | null
    description: string | null
    typeId: number | null
  }

  export type MaterialNameMaxAggregateOutputType = {
    id: number | null
    name: string | null
    dn: string | null
    pn: string | null
    degree: number | null
    description: string | null
    typeId: number | null
  }

  export type MaterialNameCountAggregateOutputType = {
    id: number
    name: number
    dn: number
    pn: number
    degree: number
    description: number
    typeId: number
    _all: number
  }


  export type MaterialNameAvgAggregateInputType = {
    id?: true
    degree?: true
    typeId?: true
  }

  export type MaterialNameSumAggregateInputType = {
    id?: true
    degree?: true
    typeId?: true
  }

  export type MaterialNameMinAggregateInputType = {
    id?: true
    name?: true
    dn?: true
    pn?: true
    degree?: true
    description?: true
    typeId?: true
  }

  export type MaterialNameMaxAggregateInputType = {
    id?: true
    name?: true
    dn?: true
    pn?: true
    degree?: true
    description?: true
    typeId?: true
  }

  export type MaterialNameCountAggregateInputType = {
    id?: true
    name?: true
    dn?: true
    pn?: true
    degree?: true
    description?: true
    typeId?: true
    _all?: true
  }

  export type MaterialNameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialName to aggregate.
     */
    where?: MaterialNameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialNames to fetch.
     */
    orderBy?: MaterialNameOrderByWithRelationInput | MaterialNameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialNameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialNames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialNames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialNames
    **/
    _count?: true | MaterialNameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialNameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialNameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialNameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialNameMaxAggregateInputType
  }

  export type GetMaterialNameAggregateType<T extends MaterialNameAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialName]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialName[P]>
      : GetScalarType<T[P], AggregateMaterialName[P]>
  }




  export type MaterialNameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialNameWhereInput
    orderBy?: MaterialNameOrderByWithAggregationInput | MaterialNameOrderByWithAggregationInput[]
    by: MaterialNameScalarFieldEnum[] | MaterialNameScalarFieldEnum
    having?: MaterialNameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialNameCountAggregateInputType | true
    _avg?: MaterialNameAvgAggregateInputType
    _sum?: MaterialNameSumAggregateInputType
    _min?: MaterialNameMinAggregateInputType
    _max?: MaterialNameMaxAggregateInputType
  }

  export type MaterialNameGroupByOutputType = {
    id: number
    name: string
    dn: string
    pn: string
    degree: number
    description: string
    typeId: number
    _count: MaterialNameCountAggregateOutputType | null
    _avg: MaterialNameAvgAggregateOutputType | null
    _sum: MaterialNameSumAggregateOutputType | null
    _min: MaterialNameMinAggregateOutputType | null
    _max: MaterialNameMaxAggregateOutputType | null
  }

  type GetMaterialNameGroupByPayload<T extends MaterialNameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialNameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialNameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialNameGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialNameGroupByOutputType[P]>
        }
      >
    >


  export type MaterialNameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dn?: boolean
    pn?: boolean
    degree?: boolean
    description?: boolean
    typeId?: boolean
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialName"]>

  export type MaterialNameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dn?: boolean
    pn?: boolean
    degree?: boolean
    description?: boolean
    typeId?: boolean
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialName"]>

  export type MaterialNameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dn?: boolean
    pn?: boolean
    degree?: boolean
    description?: boolean
    typeId?: boolean
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialName"]>

  export type MaterialNameSelectScalar = {
    id?: boolean
    name?: boolean
    dn?: boolean
    pn?: boolean
    degree?: boolean
    description?: boolean
    typeId?: boolean
  }

  export type MaterialNameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "dn" | "pn" | "degree" | "description" | "typeId", ExtArgs["result"]["materialName"]>
  export type MaterialNameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }
  export type MaterialNameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }
  export type MaterialNameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | MaterialTypeDefaultArgs<ExtArgs>
  }

  export type $MaterialNamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialName"
    objects: {
      type: Prisma.$MaterialTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      dn: string
      pn: string
      degree: number
      description: string
      typeId: number
    }, ExtArgs["result"]["materialName"]>
    composites: {}
  }

  type MaterialNameGetPayload<S extends boolean | null | undefined | MaterialNameDefaultArgs> = $Result.GetResult<Prisma.$MaterialNamePayload, S>

  type MaterialNameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialNameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialNameCountAggregateInputType | true
    }

  export interface MaterialNameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialName'], meta: { name: 'MaterialName' } }
    /**
     * Find zero or one MaterialName that matches the filter.
     * @param {MaterialNameFindUniqueArgs} args - Arguments to find a MaterialName
     * @example
     * // Get one MaterialName
     * const materialName = await prisma.materialName.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialNameFindUniqueArgs>(args: SelectSubset<T, MaterialNameFindUniqueArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialName that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialNameFindUniqueOrThrowArgs} args - Arguments to find a MaterialName
     * @example
     * // Get one MaterialName
     * const materialName = await prisma.materialName.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialNameFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialNameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialName that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameFindFirstArgs} args - Arguments to find a MaterialName
     * @example
     * // Get one MaterialName
     * const materialName = await prisma.materialName.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialNameFindFirstArgs>(args?: SelectSubset<T, MaterialNameFindFirstArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialName that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameFindFirstOrThrowArgs} args - Arguments to find a MaterialName
     * @example
     * // Get one MaterialName
     * const materialName = await prisma.materialName.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialNameFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialNameFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialNames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialNames
     * const materialNames = await prisma.materialName.findMany()
     * 
     * // Get first 10 MaterialNames
     * const materialNames = await prisma.materialName.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialNameWithIdOnly = await prisma.materialName.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialNameFindManyArgs>(args?: SelectSubset<T, MaterialNameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialName.
     * @param {MaterialNameCreateArgs} args - Arguments to create a MaterialName.
     * @example
     * // Create one MaterialName
     * const MaterialName = await prisma.materialName.create({
     *   data: {
     *     // ... data to create a MaterialName
     *   }
     * })
     * 
     */
    create<T extends MaterialNameCreateArgs>(args: SelectSubset<T, MaterialNameCreateArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialNames.
     * @param {MaterialNameCreateManyArgs} args - Arguments to create many MaterialNames.
     * @example
     * // Create many MaterialNames
     * const materialName = await prisma.materialName.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialNameCreateManyArgs>(args?: SelectSubset<T, MaterialNameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialNames and returns the data saved in the database.
     * @param {MaterialNameCreateManyAndReturnArgs} args - Arguments to create many MaterialNames.
     * @example
     * // Create many MaterialNames
     * const materialName = await prisma.materialName.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialNames and only return the `id`
     * const materialNameWithIdOnly = await prisma.materialName.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialNameCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialNameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialName.
     * @param {MaterialNameDeleteArgs} args - Arguments to delete one MaterialName.
     * @example
     * // Delete one MaterialName
     * const MaterialName = await prisma.materialName.delete({
     *   where: {
     *     // ... filter to delete one MaterialName
     *   }
     * })
     * 
     */
    delete<T extends MaterialNameDeleteArgs>(args: SelectSubset<T, MaterialNameDeleteArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialName.
     * @param {MaterialNameUpdateArgs} args - Arguments to update one MaterialName.
     * @example
     * // Update one MaterialName
     * const materialName = await prisma.materialName.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialNameUpdateArgs>(args: SelectSubset<T, MaterialNameUpdateArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialNames.
     * @param {MaterialNameDeleteManyArgs} args - Arguments to filter MaterialNames to delete.
     * @example
     * // Delete a few MaterialNames
     * const { count } = await prisma.materialName.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialNameDeleteManyArgs>(args?: SelectSubset<T, MaterialNameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialNames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialNames
     * const materialName = await prisma.materialName.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialNameUpdateManyArgs>(args: SelectSubset<T, MaterialNameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialNames and returns the data updated in the database.
     * @param {MaterialNameUpdateManyAndReturnArgs} args - Arguments to update many MaterialNames.
     * @example
     * // Update many MaterialNames
     * const materialName = await prisma.materialName.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialNames and only return the `id`
     * const materialNameWithIdOnly = await prisma.materialName.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialNameUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialNameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialName.
     * @param {MaterialNameUpsertArgs} args - Arguments to update or create a MaterialName.
     * @example
     * // Update or create a MaterialName
     * const materialName = await prisma.materialName.upsert({
     *   create: {
     *     // ... data to create a MaterialName
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialName we want to update
     *   }
     * })
     */
    upsert<T extends MaterialNameUpsertArgs>(args: SelectSubset<T, MaterialNameUpsertArgs<ExtArgs>>): Prisma__MaterialNameClient<$Result.GetResult<Prisma.$MaterialNamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialNames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameCountArgs} args - Arguments to filter MaterialNames to count.
     * @example
     * // Count the number of MaterialNames
     * const count = await prisma.materialName.count({
     *   where: {
     *     // ... the filter for the MaterialNames we want to count
     *   }
     * })
    **/
    count<T extends MaterialNameCountArgs>(
      args?: Subset<T, MaterialNameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialNameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialName.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialNameAggregateArgs>(args: Subset<T, MaterialNameAggregateArgs>): Prisma.PrismaPromise<GetMaterialNameAggregateType<T>>

    /**
     * Group by MaterialName.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialNameGroupByArgs} args - Group by arguments.
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
      T extends MaterialNameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialNameGroupByArgs['orderBy'] }
        : { orderBy?: MaterialNameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaterialNameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialNameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialName model
   */
  readonly fields: MaterialNameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialName.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialNameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    type<T extends MaterialTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialTypeDefaultArgs<ExtArgs>>): Prisma__MaterialTypeClient<$Result.GetResult<Prisma.$MaterialTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MaterialName model
   */
  interface MaterialNameFieldRefs {
    readonly id: FieldRef<"MaterialName", 'Int'>
    readonly name: FieldRef<"MaterialName", 'String'>
    readonly dn: FieldRef<"MaterialName", 'String'>
    readonly pn: FieldRef<"MaterialName", 'String'>
    readonly degree: FieldRef<"MaterialName", 'Int'>
    readonly description: FieldRef<"MaterialName", 'String'>
    readonly typeId: FieldRef<"MaterialName", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MaterialName findUnique
   */
  export type MaterialNameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter, which MaterialName to fetch.
     */
    where: MaterialNameWhereUniqueInput
  }

  /**
   * MaterialName findUniqueOrThrow
   */
  export type MaterialNameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter, which MaterialName to fetch.
     */
    where: MaterialNameWhereUniqueInput
  }

  /**
   * MaterialName findFirst
   */
  export type MaterialNameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter, which MaterialName to fetch.
     */
    where?: MaterialNameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialNames to fetch.
     */
    orderBy?: MaterialNameOrderByWithRelationInput | MaterialNameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialNames.
     */
    cursor?: MaterialNameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialNames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialNames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialNames.
     */
    distinct?: MaterialNameScalarFieldEnum | MaterialNameScalarFieldEnum[]
  }

  /**
   * MaterialName findFirstOrThrow
   */
  export type MaterialNameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter, which MaterialName to fetch.
     */
    where?: MaterialNameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialNames to fetch.
     */
    orderBy?: MaterialNameOrderByWithRelationInput | MaterialNameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialNames.
     */
    cursor?: MaterialNameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialNames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialNames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialNames.
     */
    distinct?: MaterialNameScalarFieldEnum | MaterialNameScalarFieldEnum[]
  }

  /**
   * MaterialName findMany
   */
  export type MaterialNameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter, which MaterialNames to fetch.
     */
    where?: MaterialNameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialNames to fetch.
     */
    orderBy?: MaterialNameOrderByWithRelationInput | MaterialNameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialNames.
     */
    cursor?: MaterialNameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialNames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialNames.
     */
    skip?: number
    distinct?: MaterialNameScalarFieldEnum | MaterialNameScalarFieldEnum[]
  }

  /**
   * MaterialName create
   */
  export type MaterialNameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialName.
     */
    data: XOR<MaterialNameCreateInput, MaterialNameUncheckedCreateInput>
  }

  /**
   * MaterialName createMany
   */
  export type MaterialNameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialNames.
     */
    data: MaterialNameCreateManyInput | MaterialNameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialName createManyAndReturn
   */
  export type MaterialNameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialNames.
     */
    data: MaterialNameCreateManyInput | MaterialNameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialName update
   */
  export type MaterialNameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialName.
     */
    data: XOR<MaterialNameUpdateInput, MaterialNameUncheckedUpdateInput>
    /**
     * Choose, which MaterialName to update.
     */
    where: MaterialNameWhereUniqueInput
  }

  /**
   * MaterialName updateMany
   */
  export type MaterialNameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialNames.
     */
    data: XOR<MaterialNameUpdateManyMutationInput, MaterialNameUncheckedUpdateManyInput>
    /**
     * Filter which MaterialNames to update
     */
    where?: MaterialNameWhereInput
    /**
     * Limit how many MaterialNames to update.
     */
    limit?: number
  }

  /**
   * MaterialName updateManyAndReturn
   */
  export type MaterialNameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * The data used to update MaterialNames.
     */
    data: XOR<MaterialNameUpdateManyMutationInput, MaterialNameUncheckedUpdateManyInput>
    /**
     * Filter which MaterialNames to update
     */
    where?: MaterialNameWhereInput
    /**
     * Limit how many MaterialNames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialName upsert
   */
  export type MaterialNameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialName to update in case it exists.
     */
    where: MaterialNameWhereUniqueInput
    /**
     * In case the MaterialName found by the `where` argument doesn't exist, create a new MaterialName with this data.
     */
    create: XOR<MaterialNameCreateInput, MaterialNameUncheckedCreateInput>
    /**
     * In case the MaterialName was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialNameUpdateInput, MaterialNameUncheckedUpdateInput>
  }

  /**
   * MaterialName delete
   */
  export type MaterialNameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
    /**
     * Filter which MaterialName to delete.
     */
    where: MaterialNameWhereUniqueInput
  }

  /**
   * MaterialName deleteMany
   */
  export type MaterialNameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialNames to delete
     */
    where?: MaterialNameWhereInput
    /**
     * Limit how many MaterialNames to delete.
     */
    limit?: number
  }

  /**
   * MaterialName without action
   */
  export type MaterialNameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialName
     */
    select?: MaterialNameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialName
     */
    omit?: MaterialNameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialNameInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    firebaseUid: 'firebaseUid',
    email: 'email',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VendorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    country: 'country',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum]


  export const UnitScalarFieldEnum: {
    id: 'id',
    unit: 'unit'
  };

  export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum]


  export const MaterialGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type MaterialGroupScalarFieldEnum = (typeof MaterialGroupScalarFieldEnum)[keyof typeof MaterialGroupScalarFieldEnum]


  export const MaterialTypeScalarFieldEnum: {
    id: 'id',
    type: 'type',
    groupId: 'groupId'
  };

  export type MaterialTypeScalarFieldEnum = (typeof MaterialTypeScalarFieldEnum)[keyof typeof MaterialTypeScalarFieldEnum]


  export const MaterialNameScalarFieldEnum: {
    id: 'id',
    name: 'name',
    dn: 'dn',
    pn: 'pn',
    degree: 'degree',
    description: 'description',
    typeId: 'typeId'
  };

  export type MaterialNameScalarFieldEnum = (typeof MaterialNameScalarFieldEnum)[keyof typeof MaterialNameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firebaseUid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Vendor?: VendorListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firebaseUid?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Vendor?: VendorOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    firebaseUid?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Vendor?: VendorListRelationFilter
  }, "id" | "firebaseUid" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firebaseUid?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firebaseUid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VendorWhereInput = {
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    id?: IntFilter<"Vendor"> | number
    name?: StringFilter<"Vendor"> | string
    country?: StringFilter<"Vendor"> | string
    userId?: IntFilter<"Vendor"> | number
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VendorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    name?: StringFilter<"Vendor"> | string
    country?: StringFilter<"Vendor"> | string
    userId?: IntFilter<"Vendor"> | number
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type VendorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: VendorCountOrderByAggregateInput
    _avg?: VendorAvgOrderByAggregateInput
    _max?: VendorMaxOrderByAggregateInput
    _min?: VendorMinOrderByAggregateInput
    _sum?: VendorSumOrderByAggregateInput
  }

  export type VendorScalarWhereWithAggregatesInput = {
    AND?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    OR?: VendorScalarWhereWithAggregatesInput[]
    NOT?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vendor"> | number
    name?: StringWithAggregatesFilter<"Vendor"> | string
    country?: StringWithAggregatesFilter<"Vendor"> | string
    userId?: IntWithAggregatesFilter<"Vendor"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
  }

  export type UnitWhereInput = {
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    id?: IntFilter<"Unit"> | number
    unit?: StringFilter<"Unit"> | string
  }

  export type UnitOrderByWithRelationInput = {
    id?: SortOrder
    unit?: SortOrder
  }

  export type UnitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    unit?: StringFilter<"Unit"> | string
  }, "id">

  export type UnitOrderByWithAggregationInput = {
    id?: SortOrder
    unit?: SortOrder
    _count?: UnitCountOrderByAggregateInput
    _avg?: UnitAvgOrderByAggregateInput
    _max?: UnitMaxOrderByAggregateInput
    _min?: UnitMinOrderByAggregateInput
    _sum?: UnitSumOrderByAggregateInput
  }

  export type UnitScalarWhereWithAggregatesInput = {
    AND?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    OR?: UnitScalarWhereWithAggregatesInput[]
    NOT?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Unit"> | number
    unit?: StringWithAggregatesFilter<"Unit"> | string
  }

  export type MaterialGroupWhereInput = {
    AND?: MaterialGroupWhereInput | MaterialGroupWhereInput[]
    OR?: MaterialGroupWhereInput[]
    NOT?: MaterialGroupWhereInput | MaterialGroupWhereInput[]
    id?: IntFilter<"MaterialGroup"> | number
    name?: StringFilter<"MaterialGroup"> | string
    description?: StringFilter<"MaterialGroup"> | string
    MaterialType?: MaterialTypeListRelationFilter
  }

  export type MaterialGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    MaterialType?: MaterialTypeOrderByRelationAggregateInput
  }

  export type MaterialGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaterialGroupWhereInput | MaterialGroupWhereInput[]
    OR?: MaterialGroupWhereInput[]
    NOT?: MaterialGroupWhereInput | MaterialGroupWhereInput[]
    name?: StringFilter<"MaterialGroup"> | string
    description?: StringFilter<"MaterialGroup"> | string
    MaterialType?: MaterialTypeListRelationFilter
  }, "id">

  export type MaterialGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: MaterialGroupCountOrderByAggregateInput
    _avg?: MaterialGroupAvgOrderByAggregateInput
    _max?: MaterialGroupMaxOrderByAggregateInput
    _min?: MaterialGroupMinOrderByAggregateInput
    _sum?: MaterialGroupSumOrderByAggregateInput
  }

  export type MaterialGroupScalarWhereWithAggregatesInput = {
    AND?: MaterialGroupScalarWhereWithAggregatesInput | MaterialGroupScalarWhereWithAggregatesInput[]
    OR?: MaterialGroupScalarWhereWithAggregatesInput[]
    NOT?: MaterialGroupScalarWhereWithAggregatesInput | MaterialGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaterialGroup"> | number
    name?: StringWithAggregatesFilter<"MaterialGroup"> | string
    description?: StringWithAggregatesFilter<"MaterialGroup"> | string
  }

  export type MaterialTypeWhereInput = {
    AND?: MaterialTypeWhereInput | MaterialTypeWhereInput[]
    OR?: MaterialTypeWhereInput[]
    NOT?: MaterialTypeWhereInput | MaterialTypeWhereInput[]
    id?: IntFilter<"MaterialType"> | number
    type?: StringFilter<"MaterialType"> | string
    groupId?: IntFilter<"MaterialType"> | number
    group?: XOR<MaterialGroupScalarRelationFilter, MaterialGroupWhereInput>
    MaterialName?: MaterialNameListRelationFilter
  }

  export type MaterialTypeOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    groupId?: SortOrder
    group?: MaterialGroupOrderByWithRelationInput
    MaterialName?: MaterialNameOrderByRelationAggregateInput
  }

  export type MaterialTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaterialTypeWhereInput | MaterialTypeWhereInput[]
    OR?: MaterialTypeWhereInput[]
    NOT?: MaterialTypeWhereInput | MaterialTypeWhereInput[]
    type?: StringFilter<"MaterialType"> | string
    groupId?: IntFilter<"MaterialType"> | number
    group?: XOR<MaterialGroupScalarRelationFilter, MaterialGroupWhereInput>
    MaterialName?: MaterialNameListRelationFilter
  }, "id">

  export type MaterialTypeOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    groupId?: SortOrder
    _count?: MaterialTypeCountOrderByAggregateInput
    _avg?: MaterialTypeAvgOrderByAggregateInput
    _max?: MaterialTypeMaxOrderByAggregateInput
    _min?: MaterialTypeMinOrderByAggregateInput
    _sum?: MaterialTypeSumOrderByAggregateInput
  }

  export type MaterialTypeScalarWhereWithAggregatesInput = {
    AND?: MaterialTypeScalarWhereWithAggregatesInput | MaterialTypeScalarWhereWithAggregatesInput[]
    OR?: MaterialTypeScalarWhereWithAggregatesInput[]
    NOT?: MaterialTypeScalarWhereWithAggregatesInput | MaterialTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaterialType"> | number
    type?: StringWithAggregatesFilter<"MaterialType"> | string
    groupId?: IntWithAggregatesFilter<"MaterialType"> | number
  }

  export type MaterialNameWhereInput = {
    AND?: MaterialNameWhereInput | MaterialNameWhereInput[]
    OR?: MaterialNameWhereInput[]
    NOT?: MaterialNameWhereInput | MaterialNameWhereInput[]
    id?: IntFilter<"MaterialName"> | number
    name?: StringFilter<"MaterialName"> | string
    dn?: StringFilter<"MaterialName"> | string
    pn?: StringFilter<"MaterialName"> | string
    degree?: IntFilter<"MaterialName"> | number
    description?: StringFilter<"MaterialName"> | string
    typeId?: IntFilter<"MaterialName"> | number
    type?: XOR<MaterialTypeScalarRelationFilter, MaterialTypeWhereInput>
  }

  export type MaterialNameOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    dn?: SortOrder
    pn?: SortOrder
    degree?: SortOrder
    description?: SortOrder
    typeId?: SortOrder
    type?: MaterialTypeOrderByWithRelationInput
  }

  export type MaterialNameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaterialNameWhereInput | MaterialNameWhereInput[]
    OR?: MaterialNameWhereInput[]
    NOT?: MaterialNameWhereInput | MaterialNameWhereInput[]
    name?: StringFilter<"MaterialName"> | string
    dn?: StringFilter<"MaterialName"> | string
    pn?: StringFilter<"MaterialName"> | string
    degree?: IntFilter<"MaterialName"> | number
    description?: StringFilter<"MaterialName"> | string
    typeId?: IntFilter<"MaterialName"> | number
    type?: XOR<MaterialTypeScalarRelationFilter, MaterialTypeWhereInput>
  }, "id">

  export type MaterialNameOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    dn?: SortOrder
    pn?: SortOrder
    degree?: SortOrder
    description?: SortOrder
    typeId?: SortOrder
    _count?: MaterialNameCountOrderByAggregateInput
    _avg?: MaterialNameAvgOrderByAggregateInput
    _max?: MaterialNameMaxOrderByAggregateInput
    _min?: MaterialNameMinOrderByAggregateInput
    _sum?: MaterialNameSumOrderByAggregateInput
  }

  export type MaterialNameScalarWhereWithAggregatesInput = {
    AND?: MaterialNameScalarWhereWithAggregatesInput | MaterialNameScalarWhereWithAggregatesInput[]
    OR?: MaterialNameScalarWhereWithAggregatesInput[]
    NOT?: MaterialNameScalarWhereWithAggregatesInput | MaterialNameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaterialName"> | number
    name?: StringWithAggregatesFilter<"MaterialName"> | string
    dn?: StringWithAggregatesFilter<"MaterialName"> | string
    pn?: StringWithAggregatesFilter<"MaterialName"> | string
    degree?: IntWithAggregatesFilter<"MaterialName"> | number
    description?: StringWithAggregatesFilter<"MaterialName"> | string
    typeId?: IntWithAggregatesFilter<"MaterialName"> | number
  }

  export type UserCreateInput = {
    firebaseUid: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Vendor?: VendorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firebaseUid: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Vendor?: VendorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vendor?: VendorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vendor?: VendorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firebaseUid: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorCreateInput = {
    name: string
    country: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVendorInput
  }

  export type VendorUncheckedCreateInput = {
    id?: number
    name: string
    country: string
    userId: number
    createdAt?: Date | string
  }

  export type VendorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorCreateManyInput = {
    id?: number
    name: string
    country: string
    userId: number
    createdAt?: Date | string
  }

  export type VendorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitCreateInput = {
    unit: string
  }

  export type UnitUncheckedCreateInput = {
    id?: number
    unit: string
  }

  export type UnitUpdateInput = {
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type UnitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type UnitCreateManyInput = {
    id?: number
    unit: string
  }

  export type UnitUpdateManyMutationInput = {
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type UnitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialGroupCreateInput = {
    name: string
    description: string
    MaterialType?: MaterialTypeCreateNestedManyWithoutGroupInput
  }

  export type MaterialGroupUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    MaterialType?: MaterialTypeUncheckedCreateNestedManyWithoutGroupInput
  }

  export type MaterialGroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    MaterialType?: MaterialTypeUpdateManyWithoutGroupNestedInput
  }

  export type MaterialGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    MaterialType?: MaterialTypeUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type MaterialGroupCreateManyInput = {
    id?: number
    name: string
    description: string
  }

  export type MaterialGroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialTypeCreateInput = {
    type: string
    group: MaterialGroupCreateNestedOneWithoutMaterialTypeInput
    MaterialName?: MaterialNameCreateNestedManyWithoutTypeInput
  }

  export type MaterialTypeUncheckedCreateInput = {
    id?: number
    type: string
    groupId: number
    MaterialName?: MaterialNameUncheckedCreateNestedManyWithoutTypeInput
  }

  export type MaterialTypeUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    group?: MaterialGroupUpdateOneRequiredWithoutMaterialTypeNestedInput
    MaterialName?: MaterialNameUpdateManyWithoutTypeNestedInput
  }

  export type MaterialTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    groupId?: IntFieldUpdateOperationsInput | number
    MaterialName?: MaterialNameUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type MaterialTypeCreateManyInput = {
    id?: number
    type: string
    groupId: number
  }

  export type MaterialTypeUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    groupId?: IntFieldUpdateOperationsInput | number
  }

  export type MaterialNameCreateInput = {
    name: string
    dn: string
    pn: string
    degree: number
    description: string
    type: MaterialTypeCreateNestedOneWithoutMaterialNameInput
  }

  export type MaterialNameUncheckedCreateInput = {
    id?: number
    name: string
    dn: string
    pn: string
    degree: number
    description: string
    typeId: number
  }

  export type MaterialNameUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    type?: MaterialTypeUpdateOneRequiredWithoutMaterialNameNestedInput
  }

  export type MaterialNameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type MaterialNameCreateManyInput = {
    id?: number
    name: string
    dn: string
    pn: string
    degree: number
    description: string
    typeId: number
  }

  export type MaterialNameUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialNameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    typeId?: IntFieldUpdateOperationsInput | number
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VendorListRelationFilter = {
    every?: VendorWhereInput
    some?: VendorWhereInput
    none?: VendorWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VendorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firebaseUid?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firebaseUid?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firebaseUid?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VendorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type VendorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UnitCountOrderByAggregateInput = {
    id?: SortOrder
    unit?: SortOrder
  }

  export type UnitAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UnitMaxOrderByAggregateInput = {
    id?: SortOrder
    unit?: SortOrder
  }

  export type UnitMinOrderByAggregateInput = {
    id?: SortOrder
    unit?: SortOrder
  }

  export type UnitSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MaterialTypeListRelationFilter = {
    every?: MaterialTypeWhereInput
    some?: MaterialTypeWhereInput
    none?: MaterialTypeWhereInput
  }

  export type MaterialTypeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type MaterialGroupAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MaterialGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type MaterialGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type MaterialGroupSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MaterialGroupScalarRelationFilter = {
    is?: MaterialGroupWhereInput
    isNot?: MaterialGroupWhereInput
  }

  export type MaterialNameListRelationFilter = {
    every?: MaterialNameWhereInput
    some?: MaterialNameWhereInput
    none?: MaterialNameWhereInput
  }

  export type MaterialNameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialTypeCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    groupId?: SortOrder
  }

  export type MaterialTypeAvgOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
  }

  export type MaterialTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    groupId?: SortOrder
  }

  export type MaterialTypeMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    groupId?: SortOrder
  }

  export type MaterialTypeSumOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
  }

  export type MaterialTypeScalarRelationFilter = {
    is?: MaterialTypeWhereInput
    isNot?: MaterialTypeWhereInput
  }

  export type MaterialNameCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dn?: SortOrder
    pn?: SortOrder
    degree?: SortOrder
    description?: SortOrder
    typeId?: SortOrder
  }

  export type MaterialNameAvgOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    typeId?: SortOrder
  }

  export type MaterialNameMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dn?: SortOrder
    pn?: SortOrder
    degree?: SortOrder
    description?: SortOrder
    typeId?: SortOrder
  }

  export type MaterialNameMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dn?: SortOrder
    pn?: SortOrder
    degree?: SortOrder
    description?: SortOrder
    typeId?: SortOrder
  }

  export type MaterialNameSumOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    typeId?: SortOrder
  }

  export type VendorCreateNestedManyWithoutUserInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput> | VendorCreateWithoutUserInput[] | VendorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput | VendorCreateOrConnectWithoutUserInput[]
    createMany?: VendorCreateManyUserInputEnvelope
    connect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
  }

  export type VendorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput> | VendorCreateWithoutUserInput[] | VendorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput | VendorCreateOrConnectWithoutUserInput[]
    createMany?: VendorCreateManyUserInputEnvelope
    connect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VendorUpdateManyWithoutUserNestedInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput> | VendorCreateWithoutUserInput[] | VendorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput | VendorCreateOrConnectWithoutUserInput[]
    upsert?: VendorUpsertWithWhereUniqueWithoutUserInput | VendorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VendorCreateManyUserInputEnvelope
    set?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    disconnect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    delete?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    connect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    update?: VendorUpdateWithWhereUniqueWithoutUserInput | VendorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VendorUpdateManyWithWhereWithoutUserInput | VendorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VendorScalarWhereInput | VendorScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput> | VendorCreateWithoutUserInput[] | VendorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput | VendorCreateOrConnectWithoutUserInput[]
    upsert?: VendorUpsertWithWhereUniqueWithoutUserInput | VendorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VendorCreateManyUserInputEnvelope
    set?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    disconnect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    delete?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    connect?: VendorWhereUniqueInput | VendorWhereUniqueInput[]
    update?: VendorUpdateWithWhereUniqueWithoutUserInput | VendorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VendorUpdateManyWithWhereWithoutUserInput | VendorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VendorScalarWhereInput | VendorScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVendorInput = {
    create?: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendorInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutVendorNestedInput = {
    create?: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendorInput
    upsert?: UserUpsertWithoutVendorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVendorInput, UserUpdateWithoutVendorInput>, UserUncheckedUpdateWithoutVendorInput>
  }

  export type MaterialTypeCreateNestedManyWithoutGroupInput = {
    create?: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput> | MaterialTypeCreateWithoutGroupInput[] | MaterialTypeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutGroupInput | MaterialTypeCreateOrConnectWithoutGroupInput[]
    createMany?: MaterialTypeCreateManyGroupInputEnvelope
    connect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
  }

  export type MaterialTypeUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput> | MaterialTypeCreateWithoutGroupInput[] | MaterialTypeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutGroupInput | MaterialTypeCreateOrConnectWithoutGroupInput[]
    createMany?: MaterialTypeCreateManyGroupInputEnvelope
    connect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
  }

  export type MaterialTypeUpdateManyWithoutGroupNestedInput = {
    create?: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput> | MaterialTypeCreateWithoutGroupInput[] | MaterialTypeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutGroupInput | MaterialTypeCreateOrConnectWithoutGroupInput[]
    upsert?: MaterialTypeUpsertWithWhereUniqueWithoutGroupInput | MaterialTypeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: MaterialTypeCreateManyGroupInputEnvelope
    set?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    disconnect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    delete?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    connect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    update?: MaterialTypeUpdateWithWhereUniqueWithoutGroupInput | MaterialTypeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: MaterialTypeUpdateManyWithWhereWithoutGroupInput | MaterialTypeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: MaterialTypeScalarWhereInput | MaterialTypeScalarWhereInput[]
  }

  export type MaterialTypeUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput> | MaterialTypeCreateWithoutGroupInput[] | MaterialTypeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutGroupInput | MaterialTypeCreateOrConnectWithoutGroupInput[]
    upsert?: MaterialTypeUpsertWithWhereUniqueWithoutGroupInput | MaterialTypeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: MaterialTypeCreateManyGroupInputEnvelope
    set?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    disconnect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    delete?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    connect?: MaterialTypeWhereUniqueInput | MaterialTypeWhereUniqueInput[]
    update?: MaterialTypeUpdateWithWhereUniqueWithoutGroupInput | MaterialTypeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: MaterialTypeUpdateManyWithWhereWithoutGroupInput | MaterialTypeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: MaterialTypeScalarWhereInput | MaterialTypeScalarWhereInput[]
  }

  export type MaterialGroupCreateNestedOneWithoutMaterialTypeInput = {
    create?: XOR<MaterialGroupCreateWithoutMaterialTypeInput, MaterialGroupUncheckedCreateWithoutMaterialTypeInput>
    connectOrCreate?: MaterialGroupCreateOrConnectWithoutMaterialTypeInput
    connect?: MaterialGroupWhereUniqueInput
  }

  export type MaterialNameCreateNestedManyWithoutTypeInput = {
    create?: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput> | MaterialNameCreateWithoutTypeInput[] | MaterialNameUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MaterialNameCreateOrConnectWithoutTypeInput | MaterialNameCreateOrConnectWithoutTypeInput[]
    createMany?: MaterialNameCreateManyTypeInputEnvelope
    connect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
  }

  export type MaterialNameUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput> | MaterialNameCreateWithoutTypeInput[] | MaterialNameUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MaterialNameCreateOrConnectWithoutTypeInput | MaterialNameCreateOrConnectWithoutTypeInput[]
    createMany?: MaterialNameCreateManyTypeInputEnvelope
    connect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
  }

  export type MaterialGroupUpdateOneRequiredWithoutMaterialTypeNestedInput = {
    create?: XOR<MaterialGroupCreateWithoutMaterialTypeInput, MaterialGroupUncheckedCreateWithoutMaterialTypeInput>
    connectOrCreate?: MaterialGroupCreateOrConnectWithoutMaterialTypeInput
    upsert?: MaterialGroupUpsertWithoutMaterialTypeInput
    connect?: MaterialGroupWhereUniqueInput
    update?: XOR<XOR<MaterialGroupUpdateToOneWithWhereWithoutMaterialTypeInput, MaterialGroupUpdateWithoutMaterialTypeInput>, MaterialGroupUncheckedUpdateWithoutMaterialTypeInput>
  }

  export type MaterialNameUpdateManyWithoutTypeNestedInput = {
    create?: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput> | MaterialNameCreateWithoutTypeInput[] | MaterialNameUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MaterialNameCreateOrConnectWithoutTypeInput | MaterialNameCreateOrConnectWithoutTypeInput[]
    upsert?: MaterialNameUpsertWithWhereUniqueWithoutTypeInput | MaterialNameUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: MaterialNameCreateManyTypeInputEnvelope
    set?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    disconnect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    delete?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    connect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    update?: MaterialNameUpdateWithWhereUniqueWithoutTypeInput | MaterialNameUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: MaterialNameUpdateManyWithWhereWithoutTypeInput | MaterialNameUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: MaterialNameScalarWhereInput | MaterialNameScalarWhereInput[]
  }

  export type MaterialNameUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput> | MaterialNameCreateWithoutTypeInput[] | MaterialNameUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: MaterialNameCreateOrConnectWithoutTypeInput | MaterialNameCreateOrConnectWithoutTypeInput[]
    upsert?: MaterialNameUpsertWithWhereUniqueWithoutTypeInput | MaterialNameUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: MaterialNameCreateManyTypeInputEnvelope
    set?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    disconnect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    delete?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    connect?: MaterialNameWhereUniqueInput | MaterialNameWhereUniqueInput[]
    update?: MaterialNameUpdateWithWhereUniqueWithoutTypeInput | MaterialNameUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: MaterialNameUpdateManyWithWhereWithoutTypeInput | MaterialNameUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: MaterialNameScalarWhereInput | MaterialNameScalarWhereInput[]
  }

  export type MaterialTypeCreateNestedOneWithoutMaterialNameInput = {
    create?: XOR<MaterialTypeCreateWithoutMaterialNameInput, MaterialTypeUncheckedCreateWithoutMaterialNameInput>
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutMaterialNameInput
    connect?: MaterialTypeWhereUniqueInput
  }

  export type MaterialTypeUpdateOneRequiredWithoutMaterialNameNestedInput = {
    create?: XOR<MaterialTypeCreateWithoutMaterialNameInput, MaterialTypeUncheckedCreateWithoutMaterialNameInput>
    connectOrCreate?: MaterialTypeCreateOrConnectWithoutMaterialNameInput
    upsert?: MaterialTypeUpsertWithoutMaterialNameInput
    connect?: MaterialTypeWhereUniqueInput
    update?: XOR<XOR<MaterialTypeUpdateToOneWithWhereWithoutMaterialNameInput, MaterialTypeUpdateWithoutMaterialNameInput>, MaterialTypeUncheckedUpdateWithoutMaterialNameInput>
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VendorCreateWithoutUserInput = {
    name: string
    country: string
    createdAt?: Date | string
  }

  export type VendorUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    country: string
    createdAt?: Date | string
  }

  export type VendorCreateOrConnectWithoutUserInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
  }

  export type VendorCreateManyUserInputEnvelope = {
    data: VendorCreateManyUserInput | VendorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VendorUpsertWithWhereUniqueWithoutUserInput = {
    where: VendorWhereUniqueInput
    update: XOR<VendorUpdateWithoutUserInput, VendorUncheckedUpdateWithoutUserInput>
    create: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
  }

  export type VendorUpdateWithWhereUniqueWithoutUserInput = {
    where: VendorWhereUniqueInput
    data: XOR<VendorUpdateWithoutUserInput, VendorUncheckedUpdateWithoutUserInput>
  }

  export type VendorUpdateManyWithWhereWithoutUserInput = {
    where: VendorScalarWhereInput
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyWithoutUserInput>
  }

  export type VendorScalarWhereInput = {
    AND?: VendorScalarWhereInput | VendorScalarWhereInput[]
    OR?: VendorScalarWhereInput[]
    NOT?: VendorScalarWhereInput | VendorScalarWhereInput[]
    id?: IntFilter<"Vendor"> | number
    name?: StringFilter<"Vendor"> | string
    country?: StringFilter<"Vendor"> | string
    userId?: IntFilter<"Vendor"> | number
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
  }

  export type UserCreateWithoutVendorInput = {
    firebaseUid: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutVendorInput = {
    id?: number
    firebaseUid: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutVendorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
  }

  export type UserUpsertWithoutVendorInput = {
    update: XOR<UserUpdateWithoutVendorInput, UserUncheckedUpdateWithoutVendorInput>
    create: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVendorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVendorInput, UserUncheckedUpdateWithoutVendorInput>
  }

  export type UserUpdateWithoutVendorInput = {
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    firebaseUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTypeCreateWithoutGroupInput = {
    type: string
    MaterialName?: MaterialNameCreateNestedManyWithoutTypeInput
  }

  export type MaterialTypeUncheckedCreateWithoutGroupInput = {
    id?: number
    type: string
    MaterialName?: MaterialNameUncheckedCreateNestedManyWithoutTypeInput
  }

  export type MaterialTypeCreateOrConnectWithoutGroupInput = {
    where: MaterialTypeWhereUniqueInput
    create: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput>
  }

  export type MaterialTypeCreateManyGroupInputEnvelope = {
    data: MaterialTypeCreateManyGroupInput | MaterialTypeCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type MaterialTypeUpsertWithWhereUniqueWithoutGroupInput = {
    where: MaterialTypeWhereUniqueInput
    update: XOR<MaterialTypeUpdateWithoutGroupInput, MaterialTypeUncheckedUpdateWithoutGroupInput>
    create: XOR<MaterialTypeCreateWithoutGroupInput, MaterialTypeUncheckedCreateWithoutGroupInput>
  }

  export type MaterialTypeUpdateWithWhereUniqueWithoutGroupInput = {
    where: MaterialTypeWhereUniqueInput
    data: XOR<MaterialTypeUpdateWithoutGroupInput, MaterialTypeUncheckedUpdateWithoutGroupInput>
  }

  export type MaterialTypeUpdateManyWithWhereWithoutGroupInput = {
    where: MaterialTypeScalarWhereInput
    data: XOR<MaterialTypeUpdateManyMutationInput, MaterialTypeUncheckedUpdateManyWithoutGroupInput>
  }

  export type MaterialTypeScalarWhereInput = {
    AND?: MaterialTypeScalarWhereInput | MaterialTypeScalarWhereInput[]
    OR?: MaterialTypeScalarWhereInput[]
    NOT?: MaterialTypeScalarWhereInput | MaterialTypeScalarWhereInput[]
    id?: IntFilter<"MaterialType"> | number
    type?: StringFilter<"MaterialType"> | string
    groupId?: IntFilter<"MaterialType"> | number
  }

  export type MaterialGroupCreateWithoutMaterialTypeInput = {
    name: string
    description: string
  }

  export type MaterialGroupUncheckedCreateWithoutMaterialTypeInput = {
    id?: number
    name: string
    description: string
  }

  export type MaterialGroupCreateOrConnectWithoutMaterialTypeInput = {
    where: MaterialGroupWhereUniqueInput
    create: XOR<MaterialGroupCreateWithoutMaterialTypeInput, MaterialGroupUncheckedCreateWithoutMaterialTypeInput>
  }

  export type MaterialNameCreateWithoutTypeInput = {
    name: string
    dn: string
    pn: string
    degree: number
    description: string
  }

  export type MaterialNameUncheckedCreateWithoutTypeInput = {
    id?: number
    name: string
    dn: string
    pn: string
    degree: number
    description: string
  }

  export type MaterialNameCreateOrConnectWithoutTypeInput = {
    where: MaterialNameWhereUniqueInput
    create: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput>
  }

  export type MaterialNameCreateManyTypeInputEnvelope = {
    data: MaterialNameCreateManyTypeInput | MaterialNameCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type MaterialGroupUpsertWithoutMaterialTypeInput = {
    update: XOR<MaterialGroupUpdateWithoutMaterialTypeInput, MaterialGroupUncheckedUpdateWithoutMaterialTypeInput>
    create: XOR<MaterialGroupCreateWithoutMaterialTypeInput, MaterialGroupUncheckedCreateWithoutMaterialTypeInput>
    where?: MaterialGroupWhereInput
  }

  export type MaterialGroupUpdateToOneWithWhereWithoutMaterialTypeInput = {
    where?: MaterialGroupWhereInput
    data: XOR<MaterialGroupUpdateWithoutMaterialTypeInput, MaterialGroupUncheckedUpdateWithoutMaterialTypeInput>
  }

  export type MaterialGroupUpdateWithoutMaterialTypeInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialGroupUncheckedUpdateWithoutMaterialTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialNameUpsertWithWhereUniqueWithoutTypeInput = {
    where: MaterialNameWhereUniqueInput
    update: XOR<MaterialNameUpdateWithoutTypeInput, MaterialNameUncheckedUpdateWithoutTypeInput>
    create: XOR<MaterialNameCreateWithoutTypeInput, MaterialNameUncheckedCreateWithoutTypeInput>
  }

  export type MaterialNameUpdateWithWhereUniqueWithoutTypeInput = {
    where: MaterialNameWhereUniqueInput
    data: XOR<MaterialNameUpdateWithoutTypeInput, MaterialNameUncheckedUpdateWithoutTypeInput>
  }

  export type MaterialNameUpdateManyWithWhereWithoutTypeInput = {
    where: MaterialNameScalarWhereInput
    data: XOR<MaterialNameUpdateManyMutationInput, MaterialNameUncheckedUpdateManyWithoutTypeInput>
  }

  export type MaterialNameScalarWhereInput = {
    AND?: MaterialNameScalarWhereInput | MaterialNameScalarWhereInput[]
    OR?: MaterialNameScalarWhereInput[]
    NOT?: MaterialNameScalarWhereInput | MaterialNameScalarWhereInput[]
    id?: IntFilter<"MaterialName"> | number
    name?: StringFilter<"MaterialName"> | string
    dn?: StringFilter<"MaterialName"> | string
    pn?: StringFilter<"MaterialName"> | string
    degree?: IntFilter<"MaterialName"> | number
    description?: StringFilter<"MaterialName"> | string
    typeId?: IntFilter<"MaterialName"> | number
  }

  export type MaterialTypeCreateWithoutMaterialNameInput = {
    type: string
    group: MaterialGroupCreateNestedOneWithoutMaterialTypeInput
  }

  export type MaterialTypeUncheckedCreateWithoutMaterialNameInput = {
    id?: number
    type: string
    groupId: number
  }

  export type MaterialTypeCreateOrConnectWithoutMaterialNameInput = {
    where: MaterialTypeWhereUniqueInput
    create: XOR<MaterialTypeCreateWithoutMaterialNameInput, MaterialTypeUncheckedCreateWithoutMaterialNameInput>
  }

  export type MaterialTypeUpsertWithoutMaterialNameInput = {
    update: XOR<MaterialTypeUpdateWithoutMaterialNameInput, MaterialTypeUncheckedUpdateWithoutMaterialNameInput>
    create: XOR<MaterialTypeCreateWithoutMaterialNameInput, MaterialTypeUncheckedCreateWithoutMaterialNameInput>
    where?: MaterialTypeWhereInput
  }

  export type MaterialTypeUpdateToOneWithWhereWithoutMaterialNameInput = {
    where?: MaterialTypeWhereInput
    data: XOR<MaterialTypeUpdateWithoutMaterialNameInput, MaterialTypeUncheckedUpdateWithoutMaterialNameInput>
  }

  export type MaterialTypeUpdateWithoutMaterialNameInput = {
    type?: StringFieldUpdateOperationsInput | string
    group?: MaterialGroupUpdateOneRequiredWithoutMaterialTypeNestedInput
  }

  export type MaterialTypeUncheckedUpdateWithoutMaterialNameInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    groupId?: IntFieldUpdateOperationsInput | number
  }

  export type VendorCreateManyUserInput = {
    id?: number
    name: string
    country: string
    createdAt?: Date | string
  }

  export type VendorUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTypeCreateManyGroupInput = {
    id?: number
    type: string
  }

  export type MaterialTypeUpdateWithoutGroupInput = {
    type?: StringFieldUpdateOperationsInput | string
    MaterialName?: MaterialNameUpdateManyWithoutTypeNestedInput
  }

  export type MaterialTypeUncheckedUpdateWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    MaterialName?: MaterialNameUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type MaterialTypeUncheckedUpdateManyWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialNameCreateManyTypeInput = {
    id?: number
    name: string
    dn: string
    pn: string
    degree: number
    description: string
  }

  export type MaterialNameUpdateWithoutTypeInput = {
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialNameUncheckedUpdateWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type MaterialNameUncheckedUpdateManyWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dn?: StringFieldUpdateOperationsInput | string
    pn?: StringFieldUpdateOperationsInput | string
    degree?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
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