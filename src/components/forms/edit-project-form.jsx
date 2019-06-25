import React from 'react';

export default class EditProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            projName: this.props.projectInfo.project_title,
            projDesc: this.props.projectInfo.project_description,
            projTimelineDesc: this.props.projectInfo.timeline_description,
            imgThumbnail: this.props.projectInfo.primary_image,
            mainFile: this.props.projectInfo.primary_image,
            mainImgHasUpload: false,
            projImgHasUpload: false,
            projNameLimit: false,
            timelineDescLimit: false,
            mainProjectImageLimit: false,
            mainProjectImageType: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(event) {
        event.preventDefault();
        const value = event.currentTarget.value;
        const fieldName = event.currentTarget.attributes[3].nodeValue;
        if(fieldName === 'projTimelineDesc' && value.length > 140) {
            this.setState({ [fieldName]: value, timelineDescLimit: true});
        } else if (fieldName === 'projName' && value.length > 45) {
            this.setState({ [fieldName]: value, projNameLimit: true});
        } else if (fieldName === 'projName' && value.length <= 45) {
            this.setState({ [fieldName]: value, projNameLimit: false});
        } else if (fieldName === 'projTimelineDesc' && value.length <= 140) {
            this.setState({ [fieldName]: value, timelineDescLimit: false});
        } else {
            this.setState({[fieldName]: value});
        }
    }
    onFileChange(e) {
        this.setState({mainProjectImageLimit: false, mainProjectImageType: false});
        if (e.target.files[0] !== undefined) {
            this.setState({ mainFile:e.target.files[0], mainImgHasUpload: true, imgThumbnail: '/images/checkmark.svg' },()=>{
                if(this.state.mainFile.name.length >= 100){
                    this.setState({mainProjectImageLimit: true});
                }
                let fileExtension = this.state.mainFile.name.substr(this.state.mainFile.name.length - 4);
                switch(fileExtension){
                    case ".jpg":
                    case ".png":
                    case ".gif":
                    case "jpeg":
                        break;
                    default:
                        this.setState({mainProjectImageType: true});
                }
            });
        } else {
            this.setState({mainFile:'', mainImgHasUpload: false });
        }
    }
    handleFormSubmit(event) {
        if(this.state.selectedCategory === '') {
            this.setState({ selectedCategory: false })
        }
        event.preventDefault();
        //if (this.state.selectedCategory && !this.state.timelineDescLimit && !this.state.mainProjectImageLimit && !this.state.mainProjectImageType && !this.state.projNameLimit) {
            let formData = new FormData(event.target);
            this.props.editProject(formData);
            document.getElementById("formSubmit").disabled = true;
        //}
    }
    render() {
        return(
            <form className="create-project-form container" onSubmit={this.handleFormSubmit}>
                <h2>Edit Project</h2>
                <div className="mt-4">
                    <div className="form-group" >
                        <label htmlFor="proj-name">Project Name</label>
                        <input
                            id="proj-name"
                            name="proj-name"
                            type="text"
                            field="projName"
                            className="form-control"
                            placeholder="Enter Project Name"
                            onChange={this.onTextChange}
                            value={this.state.projName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="proj-desc">Main Description</label>
                        <textarea
                            id="proj-desc"
                            name="proj-desc"
                            className="form-control"
                            field="projDesc"
                            placeholder="Summary of your project."
                            onChange={this.onTextChange}
                            rows="4"
                            value={this.state.projDesc}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="proj-timeline-desc">Timeline Description</label>
                        <textarea
                            id="proj-timeline-desc"
                            name="proj-timeline-desc"
                            className="form-control"
                            field="projTimelineDesc"
                            placeholder="A short description about your timeline."
                            onChange={this.onTextChange}
                            value={this.state.projTimelineDesc}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="proj-main-img">Main Project Image</label>
                        {this.state.mainProjectImageLimit ? mainProjectImageError : null}
                        {this.state.mainProjectImageType ? mainProjectImageTypeError : null}
                        <div className="d-flex align-items-center">
                            <img className="img-sm-thumbnail mr-2" src={this.state.imgThumbnail}/>
                            <div className="custom-file">
                                <label className="custom-file-label" htmlFor="proj-main-img">{this.state.mainFile ? this.state.mainFile.name : "Choose JPG/PNG/GIF file up to 4MB"}</label>
                                <input id="proj-main-img" type="file" className="form-control-file" name="proj-main-img" onChange={this.onFileChange}/>
                                <input id="mainImgHasUpload" type="hidden" name="mainImgHasUpload" value={this.state.mainImgHasUpload} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <input type="hidden" name="user-id" value={this.props.userId} />
                        <input type="hidden" name="formHasUpload" value="true" />
                        <input type="hidden" name="status" value="published" />
                        <div className="form-group col-6"><button id="formSubmit" type="submit" className="btn btn-primary mr-2 btn-block">Edit Project</button></div>
                        <div className="form-group col-6">
                            <button className="btn btn-secondary btn-block">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        )
        
    }
}