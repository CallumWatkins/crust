use tauri::{AppHandle, Manager, Window};

pub fn toggle_main_window_visibility(app: &AppHandle) {
  let main_window = app.get_window("main").unwrap();
  let show_hide_menu_item = app.tray_handle().get_item("showhide");

  if main_window.is_visible().unwrap() {
    main_window.hide().unwrap();
    show_hide_menu_item.set_title("Show").unwrap();
  } else {
    main_window.show().unwrap();
    unminimize_focus_window(&main_window);
    show_hide_menu_item.set_title("Hide").unwrap();
  }
}

pub fn unminimize_focus_window(window: &Window) {
  window.unminimize().unwrap();
  window.set_focus().unwrap();
}
