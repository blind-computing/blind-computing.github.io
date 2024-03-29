"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// this is the dynamitab.js class file..
// this is a class definition for a Tab. Tabs can be added to TabView objects.
var Tab = /*#__PURE__*/function () {
  function Tab(tabview, id, title) {
    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var content = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

    _classCallCheck(this, Tab);

    this._id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.class_prefix = tabview.class_prefix;
    this.all_in_tabbing_order = tabview.all_in_tabbing_order;
    this.use_bootstrap = tabview.use_bootstrap;
    this.bootstrap_fade = tabview.bootstrap_fade;
    this._tabview_id = tabview.id;
    this.panel_heading_level = tabview.panel_heading_level;
    this.panel_heading_class = tabview.panel_heading_class;
    this.tab_id = tabview.id + '-tab' + id;
    this.tab_class = tabview.class_prefix + '-tab';
    this.panel_id = tabview.id + '-panel' + id;
    this.panel_class = tabview.class_prefix + '-panel';
  }

  _createClass(Tab, [{
    key: "get_tab_element",
    value: function get_tab_element() {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tabobj = document.createElement('li');
      tabobj.setAttribute('role', 'tab');
      tabobj.setAttribute('id', this.tab_id);
      tabobj.classList.add(this.tab_class); // Add the bootstrap classes if requested.

      if (this.use_bootstrap) {
        tabobj.classList.add('nav-item', 'nav-link');
      }

      tabobj.setAttribute('data-tabid', this.id);

      if (this.all_in_tabbing_order || selected) {
        tabobj.setAttribute('tabindex', '0');
      } else {
        tabobj.setAttribute('tabindex', '-1');
      }

      tabobj.setAttribute('aria-selected', selected.toString()); // Add the bootstrap active class if the tab is selected.

      if (this.use_bootstrap && selected) {
        tabobj.classList.add('active');
      }

      tabobj.setAttribute('aria-controls', this.panel_id);

      if (this.description != undefined) {
        tabobj.setAttribute('title', this.description);
      }

      tabobj.innerHTML = this.title;
      return tabobj;
    }
  }, {
    key: "get_panel_element",
    value: function get_panel_element() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var panelobj = document.createElement('section');
      panelobj.setAttribute('id', this.panel_id);
      panelobj.classList.add(this.panel_class);

      if (this.use_bootstrap && this.bootstrap_fade) {
        panelobj.classList.add('fade');
      }

      panelobj.setAttribute('aria-labelledby', this.tab_id);
      panelobj.setAttribute('aria-hidden', !visible);

      if (!visible) {
        panelobj.style.display = 'none';
      } else {
        panelobj.style.display = 'block';
      }

      panelobj.setAttribute('role', 'tabpanel');
      panelobj.setAttribute('data-tabid', this.id);

      if (this.panel_heading_level !== 0) {
        var panelheading = document.createElement('h' + this.panel_heading_level);
        panelheading.classList.add(this.panel_heading_class);
        panelheading.innerHTML = this.title;
        panelobj.appendChild(panelheading);
      } // If content was provided at the tab's instanciation:


      if (this.content != undefined && this.content instanceof HTMLElement) {
        panelobj.appendChild(this.content);
      } else if (this.content != undefined && this.content instanceof Array) {
        for (i = 0; i < this.content.length; i++) {
          panelobj.appendChild(this.content[i]);
        }
      }

      return panelobj;
    }
  }, {
    key: "select",
    value: function select() {
      var tab = document.querySelector('#' + this.tab_id);

      if (tab && tab.getAttribute('aria-selected') != 'true') {
        // get all tabs.
        var tabs = document.querySelectorAll('.' + this.tab_class); // deselect them all.

        for (var i = 0; i < tabs.length; i++) {
          tabs[i].setAttribute('aria-selected', 'false'); // Also get rid of the tabindex if only the focused tab should have it.

          if (!this.all_in_tabbing_order) {
            tabs[i].setAttribute('tabindex', '-1');
          } // Remove the bootstrap active class if requested.


          if (this.use_bootstrap) {
            tabs[i].classList.remove('active');
          }
        } // select the one that's clicked.


        tab.setAttribute('aria-selected', 'true');

        if (!this.all_in_tabbing_order) {
          tab.setAttribute('tabindex', '0');
        }

        if (this.use_bootstrap) {
          tab.classList.add('active');
        } // get the current tab panel.


        var current_panel = document.querySelector('#' + this.panel_id);
        var panels = document.querySelectorAll('.' + this.panel_class); // hide all panels.

        for (var j = 0; j < panels.length; j++) {
          panels[j].setAttribute('aria-hidden', 'true');
          panels[j].style.display = 'none';
        } // show the correct panel.


        current_panel.setAttribute('aria-hidden', 'false');
        current_panel.style.display = 'block'; // finally, focus the newly selected tab.

        tab.focus();
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(value) {
      this._id = value;
      this.tab_id = this.tabview_id + '-tab' + value;
      this.panel_id = this.tabview_id + '-panel' + value;
    }
  }, {
    key: "tabview_id",
    get: function get() {
      return this._tabview_id;
    },
    set: function set(value) {
      this._tabview_id = value;
      this.tab_id = value + '-tab' + this.id;
      this.tab_class = value + '-tab';
      this.panel_id = value + '-panel' + this.id;
      this.panel_class = value + '-panel';
    }
  }, {
    key: "selected",
    get: function get() {
      var tab = document.querySelector('#' + this.tab_id);

      if (tab && tab.getAttribute('aria-selected') == 'true') {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Tab;
}(); // this is the class definition for TabView objects (the main object used when constructing a TabView).


var TabView = /*#__PURE__*/function () {
  function TabView(id) {
    var argument_options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TabView);

    this._id = id; // These are the default options:

    var default_options = {
      class_prefix: undefined,
      default_tab: 0,
      expand_tabs: true,
      all_in_tabbing_order: true,
      panel_heading_level: 0,
      panel_heading_class: undefined,
      use_bootstrap: false,
      bootstrap_fade: true
    }; // Merge the defaults with the provided options

    var options = _objectSpread({}, default_options, {}, argument_options);

    if (options.class_prefix === undefined) {
      this.class_prefix = id;
    } else {
      this.class_prefix = options.class_prefix;
    }

    this.panel_heading_level = options.panel_heading_level;

    if (options.panel_heading_class === undefined) {
      this.panel_heading_class = this.class_prefix + '-panelheading';
    } else {
      this.panel_heading_class = options.panel_heading_class;
    }

    this.tabs = Array();
    this.expand_tabs = options.expand_tabs;
    this.all_in_tabbing_order = options.all_in_tabbing_order;
    this.default_tab = options.default_tab;
    this.use_bootstrap = options.use_bootstrap;
    this.tablist_id = id + '-tablist';
    this.tablist_class = this.class_prefix + '-tablist';
  }

  _createClass(TabView, [{
    key: "getTabById",
    value: function getTabById(id) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id == id) {
          return this.tabs[i];
        }
      }

      return undefined;
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var tab_elements = document.querySelector('#' + this.tablist_id);
      tab_elements = tab_elements.children;
      var self = this;

      for (var i = 0; i < tab_elements.length; i++) {
        tab_elements[i].addEventListener('click', function () {
          var id = this.getAttribute('data-tabid');

          if (id) {
            var tab = self.getTabById(id);
            tab.select();
          }
        });
        tab_elements[i].addEventListener('keydown', function (event) {
          if (event.which === 13 || event.which === 32) {
            // enter or space
            event.preventDefault();
            this.click();
          } else if (event.which === 37) {
            // left arrow
            event.preventDefault();
            self.previousTab();
          } else if (event.which === 39) {
            // right arrow
            event.preventDefault();
            self.nextTab();
          }
        });
      }
    }
  }, {
    key: "previousTab",
    value: function previousTab() {
      // get the index of the current tab.
      var index = this.tabs.indexOf(this.currentTab); // check if it's 0 and create a new_index variable depending on the result.

      if (index === 0) {
        var new_index = this.tabs.length - 1;
      } else {
        var new_index = index - 1;
      } // select this new tab.


      this.tabs[new_index].select();
    }
  }, {
    key: "nextTab",
    value: function nextTab() {
      // get the index of the current tab.
      var index = this.tabs.indexOf(this.currentTab); // check if it's the last element and create a new_index variable depending on the result.

      if (index === this.tabs.length - 1) {
        var new_index = 0;
      } else {
        var new_index = index + 1;
      } // select this new tab.


      this.tabs[new_index].select();
    }
  }, {
    key: "createTab",
    // A function that creates a new tab element and adds it to the tabview.
    value: function createTab(title) {
      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      this.tabs.push(new Tab(this, this.tabs.length, title, description, content));
      return this.tabs[this.tabs.length - 1];
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(value) {
      this._id = value;

      if (this.tabs.length != 0) {
        for (var i = 0; i < this.tabs.length; i++) {
          this.tabs[i].tabview_id = value;
        }
      }
    }
  }, {
    key: "tablist",
    get: function get() {
      var tablist = document.createElement('ul');
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('id', this.tablist_id);
      tablist.classList.add(this.tablist_class); // Add the bootstrap classes if requested.

      if (this.use_bootstrap) {
        tablist.classList.add('nav', 'nav-tabs'); // If expand_tabs is also set, use the nav-justified class as well.

        if (this.expand_tabs) {
          tablist.classList.add('nav-justified');
        }
      }

      for (var i = 0; i < this.tabs.length; i++) {
        var child = this.tabs[i].get_tab_element(this.tabs[i].id == this.default_tab);

        if (this.tabs[i].id == this.default_tab) {
          this.tabs[i].select();
        }

        if (this.expand_tabs && !this.use_bootstrap) {
          child.style.width = 'calc(98% / ' + this.tabs.length + ')';
        }

        tablist.appendChild(child);
      }

      return tablist;
    }
  }, {
    key: "tabview",
    get: function get() {
      var tabview = document.createElement('section');
      tabview.setAttribute('id', this.id);
      tabview.appendChild(this.tablist);
      var tabpanel_container = document.createElement('div');

      for (var i = 0; i < this.tabs.length; i++) {
        var panel = this.tabs[i].get_panel_element(this.tabs[i].id == this.default_tab);
        tabpanel_container.appendChild(panel);
      }

      tabview.appendChild(tabpanel_container);
      return tabview;
    }
  }, {
    key: "currentTab",
    get: function get() {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].selected === true) {
          return this.tabs[i];
        }
      }

      return undefined;
    }
  }]);

  return TabView;
}();