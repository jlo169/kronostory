import React from 'react';
import ProjectCard from '../project/project-card';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        // console.log('User Status is ', this.props.userStatus);
        // const userUsername = this.props.userStatus.username;
        // const userName = this.props.userStatus.first_name + ' ' + this.props.userStatus.last_name;
        let userProjectCards = this.props.projects.map( (project) => {
            console.log(project.id);
            return <ProjectCard setView={this.props.setView} key={project.id} projectData={project} delete={this.props.delete} userStatus={this.props.userStatus}/>;
        })
        return(
            <React.Fragment>
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Dashboard -  || Projects by </h3>
                </div>
                <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                    <Link to="/create-project">
                    <button className="btn btn-primary">
                         Create New Project
                    </button>
                    </Link>
                </div>
                <div className="row d-flex">
                    {userProjectCards}
                </div>
            </React.Fragment>
        );
    }
}