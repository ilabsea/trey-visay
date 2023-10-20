import Moment from 'moment';

const realmSyncService = (() => {
  return {
    handleSyncObject
  }

  function handleSyncObject(Model, items, updatedAt, saveUpdatedAt) {
    items.map(item => {
      const existedItem = Model.findById(item.id);
      if (!updatedAt || (!!updatedAt && !!item.updated_at && Moment(updatedAt).isBefore(item.updated_at)))
        !!saveUpdatedAt && saveUpdatedAt(item.updated_at)

      if (item.deleted_at)
        !!existedItem && Model.deleteByUuid(existedItem.uuid);
      else if (!existedItem)
        Model.create(item);
      else if (!Moment(item.updated_at).isSame(existedItem.updated_at))
        Model.update(existedItem.uuid, item)
    });
  }
})();

export default realmSyncService;