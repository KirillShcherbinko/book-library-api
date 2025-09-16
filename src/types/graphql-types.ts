import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  authors: Array<Scalars['String']['output']>;
  coverId?: Maybe<Scalars['Int']['output']>;
  coverIds?: Maybe<Array<Scalars['Int']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['ID']['output'];
  subjects?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

export type BookInput = {
  authors: Array<Scalars['String']['input']>;
  coverId?: InputMaybe<Scalars['Int']['input']>;
  key: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  register: AuthResponse;
  removeBook: Scalars['Boolean']['output'];
};


export type MutationAddBookArgs = {
  book: BookInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveBookArgs = {
  bookKey: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  book: Book;
  booksBySubject?: Maybe<Array<Book>>;
  popularBooksSubjects?: Maybe<Array<Scalars['String']['output']>>;
  refresh: AuthResponse;
  searchBooks?: Maybe<Array<Book>>;
  subSubjects?: Maybe<Array<Scalars['String']['output']>>;
  subjects?: Maybe<Array<Scalars['String']['output']>>;
  userBooks?: Maybe<Array<Book>>;
};


export type QueryBookArgs = {
  key: Scalars['String']['input'];
};


export type QueryBooksBySubjectArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  subject: Scalars['String']['input'];
};


export type QuerySearchBooksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  searchQuery: Scalars['String']['input'];
};


export type QuerySubSubjectsArgs = {
  subject: Scalars['String']['input'];
};


export type QueryUserBooksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Book: ResolverTypeWrapper<Book>;
  BookInput: BookInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthResponse: AuthResponse;
  Book: Book;
  BookInput: BookInput;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
}>;

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  coverId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  coverIds?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subjects?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBook?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddBookArgs, 'book'>>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password'>>;
  removeBook?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveBookArgs, 'bookKey'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<QueryBookArgs, 'key'>>;
  booksBySubject?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType, RequireFields<QueryBooksBySubjectArgs, 'limit' | 'page' | 'subject'>>;
  popularBooksSubjects?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  refresh?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType>;
  searchBooks?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType, RequireFields<QuerySearchBooksArgs, 'limit' | 'page' | 'searchQuery'>>;
  subSubjects?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, RequireFields<QuerySubSubjectsArgs, 'subject'>>;
  subjects?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  userBooks?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType, RequireFields<QueryUserBooksArgs, 'limit' | 'page'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

