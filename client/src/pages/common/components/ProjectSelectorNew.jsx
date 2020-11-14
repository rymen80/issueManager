import React,{useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from 'axios';
import {setSelectedProject} from '../../User/UserPageReducer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0),
    minWidth: 200,
    color:"white",

    // backgroundColor:"orange"
  },
  selectEmpty: {
    // marginTop: theme.spacing(1),

  },
  inputLabel:{
    color:"white",
  },
  selectStyle:{
    color:"#3f51b5",
    backgroundColor:"#e0e0e0",
    
  }

}));

export default function ProjecSelectorNew() {
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState({});
  const userPageState = useSelector((state)=>state.userPage);
  const dispatch = useDispatch();
  useEffect( () => {
    const getData= async ()=>{
      try{
        const fetchedProjects = await axios.get('/api/projects');
        // const projectNames=fetchedProjects.data.map(fp=>fp.project_name);
        setProjects(fetchedProjects.data);
        setProject(fetchedProjects.data[0]);
        dispatch(setSelectedProject(fetchedProjects.data[0]));
      }
      catch(e){
        throw new Error(e);
      }
    };
    getData();
    // projectResult = await axios.get('/api/projects')
    //  projectName = projectResult.data.map(i => i.project_name)
  },[])
  const classes = useStyles();

  const handleChange = (event) => {
    const pid = event.target.value;
    const proj = projects.filter(p=>p.project_id===+pid);
    setProject(proj);
    dispatch(setSelectedProject(proj));
    //   {
    //   ...project,
    //   [name]: event.target.value,
    // }
    
    // );
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel} htmlFor="age-native-helper">Project</InputLabel>
        <NativeSelect
          value={project.project_name}
          onChange={handleChange}   
          className={classes.selectStyle}     
          // inputProps={{
          //   name: 'age',
          //   id: 'age-native-helper',
          // }}
        >
          {/* <option aria-label="None" value="" /> */}
  {projects.map((p) => <option key={p.project_id} value={p.project_id}>{p.project_name}</option>)}
          {/* <option value={project[0].project_name} selected></option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option> */}
        </NativeSelect>
        <FormHelperText className={classes.inputLabel}>Select Project</FormHelperText>
      </FormControl>
    </div>
  );
}
