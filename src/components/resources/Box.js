

const Box = ({component}) => {

    return (

        <div className='w-100 mb-3 p-3 shadow d-flex flex-wrap border rounded'>
            <div className="form-col">
                {component}
            </div>
        </div>
    )
}

export default Box;