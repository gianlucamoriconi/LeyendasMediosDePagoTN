

const Box = ({component}) => {

    return (

        <div className='form-editor w-100 mb-5 p-3 d-flex flex-wrap border rounded'>
            <div className="form-col w-100">
                {component}
            </div>
        </div>
    )
}

export default Box;