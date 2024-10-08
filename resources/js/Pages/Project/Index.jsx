import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";


const Index = ({auth,projects,queryParams=null})=>{

    queryParams = queryParams || {};
    const searchFieldChanged = (name,value)=>{
        if( value ){
            queryParams[name] = value;
        }else{
            delete queryParams[name]
        }
        router.get(route("project.index", queryParams));
    }

    const onKeyPress = (name,e)=>{
        if ( e.key !== 'Enter')return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name)=>{
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc'
        }
        router.get(route("project.index", queryParams));

    }
    return (<>
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>
        }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th onClick = {e=>sortChanged('id')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'id' ? 'bg-gray-950 ' : "")}>ID</th>
                                            <th className={"px-3 py-3 hover:cursor-pointer"}>Image</th>
                                            <th onClick = {e=>sortChanged('name')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'name' ? 'bg-gray-950 ' : "")}>Name</th>
                                            <th onClick = {e=>sortChanged('status')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'status' ? 'bg-gray-950 ' : "")}>Status</th>
                                            <th onClick = {e=>sortChanged('created_at')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'created_at' ? 'bg-gray-950 ' : "")}>Create date</th>
                                            <th onClick = {e=>sortChanged('due_date')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'due_date' ? 'bg-gray-950 ' : "")}>Due date</th>
                                            <th  className={"px-3 py-3 hover:cursor-pointer"}>Created by</th>
                                            <th  className={"px-3 py-3 hover:cursor-pointer"}>Actions</th>
                                        
                                        </tr>
                                        
                                    </thead>
                                    <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput placeholder="Enter project name" 
                                                defaultValue={queryParams.name}
                                                className="w-full"
                                                onBlur={e=>searchFieldChanged('name',e.target.value)}
                                                onKeyPress={e=>onKeyPress('name',e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={e=>searchFieldChanged('status',e.target.value)}>
                                                    <option value="">All</option>
                                                    <option value="in_progres">In Progress</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        
                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project,ind)=>(
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={ind}>
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                            
                                                <td className="px-3 py-2">
                                                    <img src={project.image_path} alt="image" style={{width:60}}/>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.name}
                                                </td>
                                                <td className="px-3 py-2">  
                                                    <span className={"px-2 py-1 rounded text-white " +       PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                    
                                                </td>
                                                
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="grid xl:grid-cols-3 gap-1">
                                                        <Link href={route('project.edit', project.id)} className=" font-medium text-center text-blue-600 hover:underline mx-1 ">
                                                            Edit
                                                        </Link>
                                                        <Link href={route('project.destroy', project.id)} className="font-medium text-center text-red-600 hover:underline mx-1 ">
                                                            Delete
                                                        </Link>
                                                        <Link href={route('tasks.show', project.id)} className="font-medium text-center text-green-600 hover:underline mx-1 ">
                                                            See tasks
                                                        </Link>
                                                    </div>
                                                    
                                                </td>
                                            
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                           
                           <Pagination links={projects.meta.links} />

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    </>)
}

export default Index;