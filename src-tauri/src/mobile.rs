use super::AppBuilder;

#[tauri::mobile_entry_point]
fn main() {
    AppBuilder::new().run();
}
