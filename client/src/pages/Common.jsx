const common = {
  unTitledTravelName: "Untitled Travel Name",
  notWritten : "Not written",

  displayDate: (date_string) => {
    return new Date(date_string).toLocaleDateString('en-ca', { weekday:"short", day:"numeric", month:"short"})
  },
  displayTime: (time_string) => {
    const array = time_string.split(":")
    return array[0] + ":" + array[1];
  },
  showDeleteAlert: () => {
    return window.confirm("Are you sure you want to delete it?");
  }
}

export default common;