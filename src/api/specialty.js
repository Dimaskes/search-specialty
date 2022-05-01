import axios from "axios";

export function getSpecialty(search = "", page = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get("json/specialty.json", {
        params: {
          search,
          page,
        },
      })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}
