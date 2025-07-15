import axios from "axios";

export default {
  methods: {
    async $api(url, data) {
      let result = await axios({
        method: "post",
        url: url,
        data: data,
      });
      return result.data;
    },
  },
};
