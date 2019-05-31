import React from 'react';

export default class ProjectCard extends React.Component{
    handleProjectClick(event) {
        event.preventDefault();
        this.props.setView('projectDetails', {});
    }
    render(){
        return(
            <div className="card">
                <img className="card-img-top" src="http://via.placeholder.com/640x360" alt="project card"/>
                <div className="card-body">
                    <h5 className="card-title">Project Title</h5>
                    <p className="card-text">ProjectCard component.  I render this project's description from the project table in our database. (Cards also use title and primary_image fields). Button below will be a custom styled div:</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={event => this.handleProjectClick(event)}
                    >
                        setView('project-details')
                    </button>
                    <div className="dots">...</div>
                </div>
            </div>
        );
    }
}