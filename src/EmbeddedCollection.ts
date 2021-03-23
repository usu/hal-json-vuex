// import LoadingStoreCollection from './LoadingStoreCollection'
import Resource, { EmbeddedCollectionType } from './interfaces/Resource'
import { Link } from './interfaces/StoreData'

/**
 * Imitates a full standalone collection with an items property, even if there is no separate URI (as it
 * is the case with embedded collections).
 * Reloading an embedded collection requires special information. Since the embedded collection has no own
 * URI, we need to reload the whole entity containing the embedded collection. Some extra info about the
 * containing entity must therefore be passed to the constrcutor.
 */
class EmbeddedCollection implements EmbeddedCollectionType {
  public _meta: {
    load: Promise<EmbeddedCollectionType>,
    reload: { // TODO: do we want/need to expose this externally? or sufficient if we keep this in the store and expose $reload()?
      uri: string,
      property: string
    }
  }

  _storeData: {
    items: Array<Link>
  }

  /**
   * @param items           array of items, which can be mixed primitive values and entity references
   * @param reloadUri       URI of the entity containing the embedded collection (for reloading)
   * @param reloadProperty  property in the containing entity under which the embedded collection is saved
   * @param apiActions      dependency injection of API actions
   * @param config          dependency injection of config object
   * @param loadParent      a promise that will resolve when the parent entity has finished (re-)loading
   */
  constructor (items: Array<Link>, reloadUri: string, reloadProperty: string, loadCollection: Promise<EmbeddedCollectionType> | null = null) {
    this._storeData = {
      items
    }

    this._meta = {
      load: loadCollection || Promise.resolve(this),
      reload: {
        uri: reloadUri,
        property: reloadProperty
      }
    }
  }

  /*
  $loadItems () :Promise<Array<Resource>> {
    return new Promise((resolve) => {
      const items = this._storeData.items
      // TODO: this is probably broken as LoadingStoreCollection has no constructor anymore
      // if (items instanceof LoadingStoreCollection) items._meta.load.then(result => resolve(result))
      // else resolve(items)
      resolve(items)
    })
  } */
}

export default EmbeddedCollection
