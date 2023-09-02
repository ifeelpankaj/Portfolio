import axios from "axios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });

    const { data } = await axios.get("/api/v1/logout");

    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const updateUser =
  (name, email, password, skills, about) => async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });

      const { data } = await axios.put(
        "/api/v1/admin/update",
        {
          name,
          email,
          password,
          skills,
          about,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

export const addSkills = (name, category, image) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_SKIILS_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/admin/skills/add",
      {
        name,
        category,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ADD_SKILLS_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_SKILLS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deleteSkills = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_SKILLS_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/admin/skills/${id}`);

    dispatch({
      type: "DELETE_SKILLS_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_SKILLS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const addProject =
  (title, url, image, description, techStack) => async (dispatch) => {
    try {
      dispatch({
        type: "ADD_PROJECT_REQUEST",
      });

      const { data } = await axios.post(
        "/api/v1/admin/project/add",
        { title, url, image, description, techStack },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "ADD_PROJECT_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ADD_PROJECT_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_PROJECT_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/admin/project/${id}`);

    dispatch({
      type: "DELETE_PROJECT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PROJECT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const addAward =
  (name, org,  id, url, image) => async (dispatch) => {
    try {
      dispatch({
        type: "ADD_AWARD_REQUEST",
      });

      

      const { data } = await axios.post(
        "/api/v1/admin/certificate/add",
        {
          name,
          org,
          id,
          url,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      dispatch({
        type: "ADD_AWARD_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ADD_AWARD_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

export const deleteAward = (certificationId) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_AWARD_REQUEST",
    });

    const { data } = await axios.delete(
      `/api/v1/admin/certificate/${certificationId}`
    );

    dispatch({
      type: "DELETE_AWARD_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_AWARD_FAILURE",
      payload: error.response.data.message,
    });
  }
};
