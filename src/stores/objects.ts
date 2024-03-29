import { defineStore, acceptHMRUpdate } from 'pinia';
import { None, Option, Some } from 'ts-results';

interface State {
  object_urls: Map<string, string>
}

// eslint-disable-next-line import/prefer-default-export
export const use_object_url_store = defineStore({
  id: 'blob',
  state: (): State => ({
    object_urls: new Map<string, string>(),
  }),
  actions: {
    create(key: string, obj: Blob | MediaSource): string {
      this.revoke(key);
      const url = URL.createObjectURL(obj);
      this.object_urls.set(key, url);
      return url;
    },
    get(key: string): Option<string> {
      const obj = this.object_urls.get(key);
      return obj !== undefined ? Some(obj) : None;
    },
    revoke(key: string) {
      const url = this.object_urls.get(key);
      if (url !== undefined) URL.revokeObjectURL(url);
      this.object_urls.delete(key);
    },
    revoke_all() {
      this.object_urls.forEach((val) => URL.revokeObjectURL(val));
      this.object_urls.clear();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(use_object_url_store, import.meta.hot));
}
