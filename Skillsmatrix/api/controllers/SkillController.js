/**
 * SkillController
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
   *    `/skill/new`
   */
  'new': function (req, res) {
    res.view();
  },
  

  new: function(req, res) {
      Category.find(function foundCategories(err, categories) {
        // if skill is not find output an error
        if (err) return next(err);

        // pass the array down to the /view/index.ejs page
        res.view({
          categories:categories
        });
      });

  },
  /**
   * Action blueprints:
   *    `/skill/create`
   */
   create: function (req, res, next) {

    var skillObj = {
      title: req.param('title'),
    }

    // Create a skill with the params sent from
    // The sign-up form --> create.ejs
    Skill.create(skillObj, function skillCreated (err, skill) {

      // If there's an error
      // if(err) return next(err);

       if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }

          // If error redirect back to sign-up page
          return res.redirect('/skill/create');
        }

        req.session.Skill = skill;

        // Change status to online
        skill.save(function(err, skill) {
          if(err) return next(err);

          // Add the action attribute to the skill object for the flash message.
          skill.action = " is created."

          // Let other subscriberd sockets know that the skill was created
          Skill.publishCreate(skill);

          // After succesfully creating the skill
          // Redirect to the show action
          res.redirect('/skill/show/'+skill.id);
        });
    });



  },


  /**
   * Action blueprints:
   *    `/skill/show`
   */
  show: function(req, res, next) {
    Skill.findOne(req.param('id'), function foundSkill(err, skill) {
      // if skill is not find output an error
      if (err) return next(err);

      // if the skill is find
      if(!skill) return next();

      // Show skill
      res.view({
        skill:skill
      });
    });
  },

  /**
   * Action blueprints:
   *    `/skill/`
   */
  index: function(req, res, next) {
    // Get an array of all skills in the Skill collecction
    Skill.find(function foundSkills(err, skills) {
      // if skill is not find output an error
      if (err) return next(err);

      // pass the array down to the /view/index.ejs page
      res.view({
        skills:skills
      });
    });
  },


  /**
   * Action blueprints:
   *    `/skill/edit`
   */
  edit: function(req, res, next) {
    Skill.findOne(req.param('id'), function foundSkill(err, skill) {
      // if skill is not find output an error
      if (err) return next(err);

      // if the skill is find
      if(!skill) return next('Skill doen\'t exist.');

      // Show skill
      res.view({
        skill:skill
      });
    });
  },

  /**
   * Action blueprints:
   *    `/skill/delete/skill.id`
   */
  delete: function(req, res, next) {
    Skill.findOne(req.param('id'), function foundSkill(err, skill) {
      // if skill is not find output an error
      if (err) return next(err);

      // if the skill is find
      if(!skill) return next('Skill doen\'t exist.');

      // Show skill
      res.view({
        skill:skill
      });
    });
  },

  /**
   * Action blueprints:
   *    `/skill/update`
   */
  update: function(req, res, next) {

    var skillObj = {
      title: req.param('title')
    }


    Skill.update(req.param('id'), skillObj, function skillUpdated(err) {
      // if skill is not find output an error
      if(err) {
        return res.redirect('/skill/edit/' + req.param('id'));
      }

      res.redirect('/skill/show/' + req.param('id'));
    });
  },  


  /**
   * Action blueprints:
   *    `/skill/destroy`
   */
  destroy: function(req, res, next) {
    Skill.findOne(req.param('id'), function foundSkill(err, skill) {
      // if skill is not find output an error
      if (err) return next(err);

      // if the skill is find
      if(!skill) return next('Skill doen\'t exist.');

      var saved_skill_title = skill.title;

      Skill.destroy(req.param('id'), function skillDeleted(err){
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this skill is now logged in
        Skill.publishUpdate(skill.id, {
          id: skill.id,
          title: skill.title,
          action: ' has deleted.'
        });

        // Let other subscriberd sockets know that the skill was deleted
          Skill.publishDestroy(skill.id);
      });

      res.redirect('/skill');
    });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SkillController)
   */
  _config: {}

  
};
