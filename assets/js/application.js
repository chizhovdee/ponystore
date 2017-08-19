var App = (function(){
    function App(){
        this.el = document.getElementsByClassName("catalog")[0];
        this.template = _.template(document.getElementById('catalog-template').innerHTML);

        this.bindEventListeners();

        var defaultData = _.sample(appData, 20);

        this.render({items: defaultData});
    }

    App.prototype = {
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

          this.render({items: filtered});
      }
    };

    return App;
})();

ready(function(){
    new App();
});