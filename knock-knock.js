// This sets the item object to have a name and a observable quality
function Item(quantity, defaultItem){
	var self = this;
    self.quantity = ko.observable(quantity);
    self.name = ko.observable(defaultItem);

    self.formattedPrice = ko.computed(function() {
        var price = self.name().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });
}

function Store(){
	var self = this;

	self.availableItems = [
		{ itemName: "Short Sword", price: 40 },
        { itemName: "Carrot in a stick", price: 20 },
        { itemName: "Stevia", price: 2550 },
        { itemName: "Leather Armor", price: 700 },
        { itemName: "Composite Bow", price: 550 },
        { itemName: "Bastard Sword", price: 200 },
        { itemName: "Generic Sword", price: 50 },
        { itemName: "Battle Axe", price: 1200 },
        { itemName: "Magic Wand", price: 3550 }
	]

	self.items = ko.observableArray([
		new Item(1, self.availableItems[0]),
		new Item(1, self.availableItems[0])
	]);

	// Computed data
    self.total = ko.computed(function() {
       var totalPrice = 0;
       for (var i = 0; i < self.items().length; i++)
           totalPrice += self.items()[i].name().price * self.items()[i].quantity();
       return totalPrice;
    }); 

	self.addItem = function(){ self.items.push(new Item(1, self.availableItems[0])); };
  self.addSpecificItem = function(itemName2, price2){ 
    self.addToStore({itemName: itemName2, price: price2});
    self.items.push( new Item( 1, self.availableItems[self.availableItems.length - 1]) );
  };
	self.removeItem = function(item) { self.items.remove(item); };
  self.addToStore = function(object){
    self.availableItems.push(object);
  }
}

ko.applyBindings(new Store());