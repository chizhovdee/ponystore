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
          document.getElementById('btn-filter').addEventListener('click', function(e){
              console.log(e);
          });
      }
    };

    return App;
})();

ready(function(){
    new App();
});