import { PostHogCore, PostHogFetchOptions, PostHogFetchResponse, PostHogPersistedProperty } from '../../posthog-core/src';
import { PostHogOptions } from './types';
export declare class PostHog extends PostHogCore {
    private _storage;
    private _storageCache;
    private _storageKey;
    constructor(apiKey: string, options?: PostHogOptions);
    getPersistedProperty<T>(key: PostHogPersistedProperty): T | undefined;
    setPersistedProperty<T>(key: PostHogPersistedProperty, value: T | null): void;
    fetch(url: string, options: PostHogFetchOptions): Promise<PostHogFetchResponse>;
    getLibraryId(): string;
    getLibraryVersion(): string;
    getCustomUserAgent(): void;
    getCommonEventProperties(): any;
}
