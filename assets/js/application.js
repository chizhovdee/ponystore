var App = (function(){
    function App(){
        this.el = document.querySelector(".catalog");
        this.template = _.template(document.getElementById('catalog-template').innerHTML);

        this.bindEventListeners();

        var defaultData = _.sample(appData, this.itemsLimit);

        this.render({items: defaultData});
    }

    App.prototype = {
      itemsLimit: 20,

      render: function(data){
          this.el.innerHTML = this.template(data);
      },

      bindEventListeners: function(){
          var self = this;

          document.getElementById('btn-filter').addEventListener('click', function(e){
              new FilterModal(self);
          });
      },

      filter: function(options){
          var filtered = [];

          appData.forEach(function(item){
              if(
                  item.is_new == options.isNew && item.color === options.color &&
                  item.price >= options.minPrice && item.price <= options.maxPrice &&
                  _.contains(options.kinds, item.kind)
                ) {
                  filtered.push(item);
              };
          });

          this.render({items: _.sample(filtered, this.itemsLimit)});
      }
    };

    return App;
})();

ready(function(){
    new App();
});