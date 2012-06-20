describe("MainMenu", function () {
  it("#nextItem", function () {
    var sceneManager = new SceneManager();
    var firstItem = new OnePlayerMenuItem(sceneManager);
    var secondItem = new ConstructionMenuItem(sceneManager);
    var menu = new MainMenu();
    menu.setItems([firstItem, secondItem]);
    expect(menu.getCurrentItem()).toBe(firstItem);
    menu.nextItem();
    expect(menu.getCurrentItem()).toBe(secondItem);
    menu.nextItem();
    expect(menu.getCurrentItem()).toBe(firstItem);
  });
  
  it("#executeCurrentItem", function () {
    var sceneManager = new SceneManager();
    var item = new OnePlayerMenuItem(sceneManager);
    var menu = new MainMenu();
    menu.setItems([item]);
    spyOn(item, 'execute');
    menu.executeCurrentItem();
    expect(item.execute).toHaveBeenCalled();
  });
  
  it("#getItemsInfo", function () {
    var sceneManager = new SceneManager();
    var firstItem = new OnePlayerMenuItem(sceneManager);
    firstItem.setName('ITEM #1');
    var secondItem = new ConstructionMenuItem(sceneManager);
    secondItem.setName('ITEM #2');
    var menu = new MainMenu();
    menu.setItems([firstItem, secondItem]);
    expect(menu.getItemsInfo()).toEqual([
      {'name': 'ITEM #1', 'isCurrent': true},
      {'name': 'ITEM #2', 'isCurrent': false},
    ]);
  });
});
