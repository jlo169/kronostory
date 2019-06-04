import React from 'react';
import axios from 'axios';
import CreateProjectForm from './forms/create-project-form';
import Dashboard from './profile/dashboard';
import Footer from './layout/footer';
import Header from './layout/header';
import ProjectCatalog from './project/project-catalog';
import ProjectDetails from './project/project-details';
import UserLogin from './forms/user-login';
import UserSignup from './forms/user-signup';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            params: {}
        }
        this.setView = this.setView.bind(this)
    }
    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        axios.get('/api/projects.php')
            .then(response => {
                // handle success
                console.log(response.data);
                this.setState({
                    projects: response.data, 
                    userId: response.data[1].user_id
                }, ()=>console.log("userid: ", this.state.userId)
                );
                console.log(this.state);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function (response) {
              
            });
    }
    render(){
        // let currentPage;
        // const pageName = this.state.view.name;
        // switch (pageName) {
        //     case 'catalog':
        //         currentPage = <ProjectCatalog setView={this.setView} projects={this.state.projects}/>;
        //         break;
        //     case 'userLogin':
        //         currentPage = <UserLogin setView={this.setView} />;
        //         break;
        //     case 'userSignup':
        //         currentPage = <UserSignup setView={this.setView} />;
        //         break;
        //     case 'dashboard':
        //         currentPage = <Dashboard setView={this.setView} projects={this.state.projects} />;
        //         break;
        //     case 'projectDetails':
        //         currentPage = <ProjectDetails setView={this.setView} />;
        //         break;
        //     case 'createProjectForm':
        //         currentPage = <CreateProjectForm setView={this.setView} userId={this.state.userId} />;
        // }
        return(
            <React.Fragment>
            <div className="container-fluid header">
                <Header title="KronoStory" setView={this.setView} />    
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" render={props => <ProjectCatalog {...props} projects={this.state.projects}/> }/>
                    <Route path="/user-login" component={UserLogin}/>
                    <Route path="/user-signup" component={UserSignup}/>
                    <Route path="/dashboard" render={props => <Dashboard {...props} projects={this.state.projects}/> }/>
                    <Route path="/project-details" render={props => <ProjectDetails {...props} projectId={this.state.params}/> }/>
                    <Route path="/create-project" render={props => <CreateProjectForm {...props} userId={this.state.userId}/> }/>
                </Switch>
            </div>
            <div className="container-fluid footer">
                <Footer setView={this.setView} />
            </div>
            </React.Fragment>

        );
    }
}