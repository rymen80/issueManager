import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import { setSelectedProject } from "../../User/UserPageReducer";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    color: "white",
  },
  inputLabel: {
    color: "white",
  },
  selectStyle: {
    color: "#3f51b5",
    backgroundColor: "#e0e0e0",
  },
}));

export default function ProjecSelectorNew() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState({});
  const userPageState = useSelector((state) => state.userPage);
  useEffect(async () => {
    const getData = async () => {
      try {
        /** @summary Get only those projects to which user belong */

        const fetchedProjects = await axios.get(
          `/api/projects?userid=${
            JSON.parse(localStorage.getItem("userauth")).id
          }`
        );

        return fetchedProjects;
      } catch (e) {
        throw new Error(e);
      }
    };
    const res = await getData();
    setProjects(res.data);
    setProject(res.data[0]);
    dispatch(setSelectedProject(res.data[0]));
  }, []);
  const classes = useStyles();

  const handleChange = async (event) => {
    const pid = event.target.value;
    try {
      setValue(pid);
      setProject(projects.filter((p) => p.project_id === +pid)[0]);

      dispatch(
        setSelectedProject(projects.filter((p) => p.project_id === +pid)[0])
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel} htmlFor="age-native-helper">
          Project
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleChange}
          className={classes.selectStyle}
        >
          {projects.map((p) => (
            <option key={p.project_id} value={p.project_id}>
              {p.project_name}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText className={classes.inputLabel}>
          Select Project
        </FormHelperText>
      </FormControl>
    </div>
  );
}
