import type { FetchError } from "ofetch";

export type ValidationError = FetchError<{
  detail: [
    {
      type: string | "missing";
      msg: string;
      loc: string[];
    },
  ];
}>;

export type ClientError = FetchError<{
  errors: [
    {
      status: string | "400";
      title: string;
      detail: string;
    },
  ];
}>;

// JSON api typing
type PlatformType = "WINDOWS" | "MACOS" | "LINUX";

type ResourceMap = {
  tool: {
    cmd: string;
    args: string[];
  } & Partial<{
    version?: string;
  }>;
  agents: {
    id: string;
    description: string;
    token: string;
    last_seen_at: Date;
    created_at: Date;
    jobs: Ref<"jobs">[];
  } & Partial<{
    hostname: string;
    platform: PlatformType;
    available_tools: Ref<"tool">[];
  }>;
  jobs: {
    id: string;
    name: string;
    agent_id: string;
    action: unknown; // TODO: specify
  } & Partial<{
    description: string;
    started_at: Date;
    completed_at: Date;
    created_at: Date;
    results: unknown; // TODO: specify
  }>;
  reports: {
    id: string;
    results: unknown; // TODO: specify
    created_at: Date;
  };
};

type RMKeys = keyof ResourceMap;

type Ref<K extends RMKeys = RMKeys> = ResourceMap[K];

type Identifier<K extends RMKeys = RMKeys> = {
  type: K;
  id: string;
};

export type Entity<K extends RMKeys = RMKeys> = Identifier<K> & {
  attributes: ResourceMap[K];
};

// JSON API documents
export type SingleDocument<K extends RMKeys = RMKeys> = {
  data: Entity<K>;
};

export type CollectionDocument<K extends RMKeys = RMKeys> = {
  data: Entity<K>[];
};

export type JsonDocument<K extends RMKeys = RMKeys> =
  | SingleDocument<K>
  | CollectionDocument<K>;

// Type guards
export function isType<K extends keyof ResourceMap>(
  r: Entity,
  t: K,
): r is Entity<K> {
  return r.type === t;
}

export function isCollectionDocument<K extends RMKeys>(
  doc: JsonDocument<K>,
): doc is CollectionDocument<K> {
  return Array.isArray(doc.data);
}

export function isSingleDocument<K extends RMKeys>(
  doc: JsonDocument<K>,
): doc is SingleDocument<K> {
  return !Array.isArray(doc.data);
}

export function isSingleDocumentOf<K extends RMKeys>(
  doc: JsonDocument,
  t: K,
): doc is SingleDocument<K> {
  return isSingleDocument(doc) && isType(doc.data, t);
}

export function isCollectionDocumentOf<K extends RMKeys>(
  doc: JsonDocument,
  t: K,
): doc is CollectionDocument<K> {
  return isCollectionDocument(doc) && doc.data.every((d) => isType(d, t));
}
