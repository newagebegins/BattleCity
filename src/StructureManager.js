function StructureManager(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Builder.Event.STRUCTURE_CREATED]);
}
