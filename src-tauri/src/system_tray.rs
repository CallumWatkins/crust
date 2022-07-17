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

pub fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
  match event {
    SystemTrayEvent::LeftClick { .. } => {
      let main_window = app.get_window("main").unwrap();
      if main_window.is_visible().unwrap() {
        window_control::unminimize_focus_window(&main_window);
      }
    }
    SystemTrayEvent::DoubleClick { .. } => {
      window_control::toggle_main_window_visibility(app);
    }
    SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
      "crust" => {
        let main_window = app.get_window("main").unwrap();
        window_control::unminimize_focus_window(&main_window);
      }
      "showhide" => {
        window_control::toggle_main_window_visibility(app);
      }
      "quit" => {
        app.exit(0);
      }
      _ => {}
    },
    _ => {}
  }
}
