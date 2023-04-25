export const getData = async (dispatch) => {
  const userId = localStorage.getItem("token");

  const res = await fetch(
    `https://timetracker-be09e-default-rtdb.firebaseio.com/UserData/${userId}.json`
  );
  const data = await res.json();
  if (data) {
    const formattedData = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    dispatch({
      type: "SET_PROJECT_DETAILS",
      data: formattedData,
    });
  }
};

export function removeHtmlTags(str) {
  return str.replace(/(<([^>]+)>)/gi, "");
}
