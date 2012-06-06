describe("Event Manager", function () {
  it("should notify subscribers about events", function () {
    var EVENT_1 = {name: 'event_1'};
    var EVENT_2 = {name: 'event_2'};
    
    var eventManager = new EventManager();
    
    var subscriber1 = jasmine.createSpyObj('subscriber', ['notify']);
    var subscriber2 = jasmine.createSpyObj('subscriber', ['notify']);
    
    eventManager.addSubscriber(subscriber1, ['event_1']);
    eventManager.addSubscriber(subscriber2, ['event_1', 'event_2']);
    
    eventManager.fireEvent(EVENT_1);
    eventManager.fireEvent(EVENT_2);
    
    expect(subscriber1.notify).toHaveBeenCalledWith(EVENT_1);
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_1);
    expect(subscriber1.notify).not.toHaveBeenCalledWith(EVENT_2);
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_2);
  });
  
  it("can remove subscribers", function () {
    var EVENT_1 = {name: 'event_1'};
    var EVENT_2 = {name: 'event_2'};
    
    var eventManager = new EventManager();
    
    var subscriber1 = jasmine.createSpyObj('subscriber', ['notify']);
    var subscriber2 = jasmine.createSpyObj('subscriber', ['notify']);
    
    eventManager.addSubscriber(subscriber1, ['event_1']);
    eventManager.addSubscriber(subscriber2, ['event_1', 'event_2']);
    
    eventManager.removeSubscriber(subscriber1);
    
    eventManager.fireEvent(EVENT_1);
    eventManager.fireEvent(EVENT_2);
    
    expect(subscriber1.notify).not.toHaveBeenCalled();
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_1);
    expect(subscriber2.notify).toHaveBeenCalledWith(EVENT_2);
  });
});
