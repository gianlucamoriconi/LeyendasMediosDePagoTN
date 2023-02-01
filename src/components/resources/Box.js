

const Box = ({component}) => {

    return (

        <div className='form-editor shadow w-100 mb-3 mb-md-5 p-3 d-flex flex-wrap rounded'>
            <div className="form-col w-100">
                {component}
            </div>
        </div>
    )
}

export default Box;