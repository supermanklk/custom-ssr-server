import { CHANGE_LIST } from "./contants";

const changeList = (list) => ({
  type: CHANGE_LIST,
  list,
});

export const getHomeList = (server) => {
  // axiosInstance 是通过 react-thunk 的  whit
  return (dispatch, getState, axiosInstance) => {
    // axios.post 返回的是promise
    return axiosInstance
      .post(
        "/question/getQuestionList",
        {
          type: "lightspot",
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwicGFzcyI6IjQ1NiIsImxvZ2luX3RpbWUiOjE2Mzk1ODU0OTc0MzQsImlhdCI6MTYzOTU4NTQ5N30.kYDgOOm0g-ustu9sBLvr0pzdIdoE8n0SDYoYyCTW81s",
          },
        }
      )
      .then((res) => {
        const list = res.data.results;
        dispatch(changeList(list));
      });
  };
};
