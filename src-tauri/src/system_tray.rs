use tauri::{
  AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
  SystemTrayMenuItem,
};

use crate::window_control;

pub fn create_system_tray() -> SystemTray {
  let crust = CustomMenuItem::new(String::from("crust"), "Crust");
  let show_hide = CustomMenuItem::new(String::from("showhide"), "Hide");
  let quit = CustomMenuItem::new(String::from("quit"), "Quit");

  let tray_menu = SystemTrayMenu::new()
    .add_item(crust)
    .add_item(show_hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

  SystemTray::new().with_menu(tray_menu)
}

