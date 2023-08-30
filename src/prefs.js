"use strict";

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {}

function buildPrefsWidget() {
  const gschema = Gio.SettingsSchemaSource.new_from_directory(
    Me.dir.get_child("schemas").get_path(),
    Gio.SettingsSchemaSource.get_default(),
    false
  );

  this.settings = new Gio.Settings({
    settings_schema: gschema.lookup(
      "org.gnome.shell.extensions.improvedosk",
      true
    ),
  });

  // https://gjs-docs.gnome.org/gtk40/gtk.widget#index-properties
  const prefsWidget = new Gtk.Grid({
    margin_top: 24,
    margin_bottom: 24,
    margin_start: 24,
    margin_end: 24,
    column_spacing: 24,
    row_spacing: 12,
    visible: true,
  });

  const labelPortraitHeight = new Gtk.Label({
    label: "Portrait Height in Percent",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelPortraitHeight, 0, 0, 1, 1);

  let inputPortraitHeight = new Gtk.SpinButton();
  inputPortraitHeight.set_range(0, 100);
  inputPortraitHeight.set_increments(1, 10);
  this.settings.bind(
    "portrait-height",
    inputPortraitHeight,
    "value",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputPortraitHeight, 1, 0, 1, 1);

  const labelLandscapeHeight = new Gtk.Label({
    label: "Landscape Height in Percent",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelLandscapeHeight, 0, 1, 1, 1);

  let inputLandscapeHeight = new Gtk.SpinButton();
  inputLandscapeHeight.set_range(0, 100);
  inputLandscapeHeight.set_increments(1, 10);
  this.settings.bind(
    "landscape-height",
    inputLandscapeHeight,
    "value",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputLandscapeHeight, 1, 1, 1, 1);

  const labelResizeDesktop = new Gtk.Label({
    label: "Resize Desktop (Shell restart required)",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelResizeDesktop, 0, 2, 1, 1);

  let inputResizeDesktop = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "resize-desktop",
    inputResizeDesktop,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputResizeDesktop, 1, 2, 1, 1);

  const labelIgnoreTouchInput = new Gtk.Label({
    label: "Ignore touch-input",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelIgnoreTouchInput, 0, 3, 1, 1);

  let inputIgnoreTouchInput = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "ignore-touch-input",
    inputIgnoreTouchInput,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  //Gray out on force-touch-input
  this.settings.bind(
    "force-touch-input",
    inputIgnoreTouchInput,
    "sensitive",
    Gio.SettingsBindFlags.INVERT_BOOLEAN
  );
  prefsWidget.attach(inputIgnoreTouchInput, 1, 3, 1, 1);

  const labelForceTouchInput = new Gtk.Label({
    label: "Force touch-input",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelForceTouchInput, 0, 4, 1, 1);

  let inputForceTouchInput = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "force-touch-input",
    inputForceTouchInput,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  //Gray out on ignore-touch-input
  this.settings.bind(
    "ignore-touch-input",
    inputForceTouchInput,
    "sensitive",
    Gio.SettingsBindFlags.INVERT_BOOLEAN
  );
  prefsWidget.attach(inputForceTouchInput, 1, 4, 1, 1);

  const labelShowStatusbarIcon = new Gtk.Label({
    label: "Show statusbar icon",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelShowStatusbarIcon, 0, 5, 1, 1);

  let inputShowStatusbarIcon = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "show-statusbar-icon",
    inputShowStatusbarIcon,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputShowStatusbarIcon, 1, 5, 1, 1);

  const labelAudibleClick = new Gtk.Label({
    label: "Audible click on key press",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelAudibleClick, 0, 6, 1, 1);

  let inputAudibleClick = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "enable-audible-click",
    inputAudibleClick,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputAudibleClick, 1, 6, 1, 1);

  const labelEnableSplit = new Gtk.Label({
    label: "Enable split keyboard",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelEnableSplit, 0, 7, 1, 1);

  let inputEnableSplit = new Gtk.Switch({
    halign: Gtk.Align.START,
    visible: true,
  });
  this.settings.bind(
    "enable-split",
    inputEnableSplit,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputEnableSplit, 1, 7, 1, 1);

  const labelPortraitSplit = new Gtk.Label({
    label: "Keyboard split space in portrait (number of empty key slots)",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelPortraitSplit, 0, 8, 1, 1);

  let inputPortraitSplit = new Gtk.SpinButton();
  inputPortraitSplit.set_range(0, 50);
  inputPortraitHeight.set_increments(1, 5);
  this.settings.bind(
    "portrait-split",
    inputPortraitSplit,
    "value",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputPortraitSplit, 1, 8, 1, 1);

  const labelLandscapeSplit = new Gtk.Label({
    label: "Keyboard split space in landscape (number of empty key slots)",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(labelLandscapeSplit, 0, 9, 1, 1);

  let inputLandscapeSplit = new Gtk.SpinButton();
  inputLandscapeSplit.set_range(0, 30);
  inputPortraitHeight.set_increments(1, 5);
  this.settings.bind(
    "landscape-split",
    inputLandscapeSplit,
    "value",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(inputLandscapeSplit, 1, 9, 1, 1);

  return prefsWidget;
}
