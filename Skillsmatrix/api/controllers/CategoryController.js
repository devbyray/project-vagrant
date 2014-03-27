/**
 * CategoryController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  /**
   * Action blueprints:
   *    `/category/new`
   */
  'new': function (req, res) {
    res.view();
  },
  
  /**
   * Action blueprints:
   *    `/category/create`
   */
   create: function (req, res, next) {

    var categoryObj = {
      title: req.param('title'),
    }

    // Create a category with the params sent from
    // The sign-up form --> create.ejs
    Category.create(categoryObj, function categoryCreated (err, category) {

      // If there's an error
      // if(err) return next(err);

       if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }

          // If error redirect back to sign-up page
          return res.redirect('/category/create');
        }

        req.session.Category = category;

        // Change status to online
        category.save(function(err, category) {
          if(err) return next(err);

          // Add the action attribute to the category object for the flash message.
          category.action = " is created."

          // Let other subscriberd sockets know that the category was created
          Category.publishCreate(category);

          // After succesfully creating the category
          // Redirect to the show action
          res.redirect('/category/show/'+category.id);
        });
    });



  },


  /**
   * Action blueprints:
   *    `/category/show`
   */
  show: function(req, res, next) {
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      // if category is not find output an error
      if (err) return next(err);

      // if the category is find
      if(!category) return next();

      // Show category
      res.view({
        category:category
      });
    });
  },

  /**
   * Action blueprints:
   *    `/category/`
   */
  index: function(req, res, next) {
    // Get an array of all categorys in the Category collecction
    Category.find(function foundCategorys(err, categorys) {
      // if category is not find output an error
      if (err) return next(err);

      // pass the array down to the /view/index.ejs page
      res.view({
        categorys:categorys
      });
    });
  },


  /**
   * Action blueprints:
   *    `/category/edit`
   */
  edit: function(req, res, next) {
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      // if category is not find output an error
      if (err) return next(err);

      // if the category is find
      if(!category) return next('Category doen\'t exist.');

      // Show category
      res.view({
        category:category
      });
    });
  },

  /**
   * Action blueprints:
   *    `/category/update`
   */
  update: function(req, res, next) {

    Category.update(req.param('id'), categoryObj, function categoryUpdated(err) {
      // if category is not find output an error
      if(err) {
        return res.redirect('/category/edit/' + req.param('id'));
      }

      res.redirect('/category/show/' + req.param('id'));
    });
  },  


  /**
   * Action blueprints:
   *    `/category/delete`
   */
  delete: function(req, res, next) {
    Category.findOne(req.param('id'), function foundCategory(err, category) {
      // if category is not find output an error
      if (err) return next(err);

      // if the category is find
      if(!category) return next('Category doen\'t exist.');

      var saved_category_title = category.title;

      Category.delete(req.param('id'), function categoryDeleted(err){
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this category is now logged in
        Category.publishUpdate(category.id, {
          loggedIn: false,
          id: category.id,
          title: category.title,
          action: ' has deleted.'
        });

        // Let other subscriberd sockets know that the category was deleted
          Category.publishDestroy(category.id);
      });

      res.redirect('/category');
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CategoryController)
   */
  _config: {}

  
};
