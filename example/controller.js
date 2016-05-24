(function(global){
  var listComponent;
  var formComponent;
  global.Controller = {
    init: function(){
      listComponent = new ListComponent()
      .create('#item-list-section')
      .listenTo('click', handleClickList);
    }
  }
  function handleClickList(elem){
    if(formComponent){
      formComponent.dispose();
    }
    var formHtml =_formHtml;
    if(!formComponent){
      formComponent = new FormComponent();
    }
    formComponent.create('#form-section', formHtml);
  }

})(window.App = window.App || {}, window.App)

var _formHtml = "<div><p>Name</p><input data-ref='NameInput' type='text' /><p class='hidden' data-ref='NameError'>Invalid field</p></div>";
