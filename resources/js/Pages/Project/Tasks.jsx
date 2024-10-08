import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP,TASK_STATUS_TEXT_MAP,TASK_PRIORITY_TEXT_MAP,TASK_PRIORITY_CLASS_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

const Tasks = ({auth,tasks,queryParams})=>{
    queryParams = queryParams || {
        project_id:tasks.data[0].project.id,
    };
    
    const onKeyPress = (name,e)=>{
        if ( e.key !== 'Enter')return;

        searchFieldChanged(name, e.target.value);
    }

    const searchFieldChanged = (name,value)=>{
        if( value ){
            queryParams[name]=value;
        }else{
            delete queryParams[name];
        }
        console.log(queryParams);
        router.get(route("task.index", queryParams));
        // router.get(route('tasks.show', tasks.data[0].project.id, queryParams));
    }

    const sortChanged = (name)=>{
        if ( name === queryParams.sort_field ){
            if ( queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';

            }else{
                queryParams.sort_direction ='asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';

        }
        router.get(route("task.index", queryParams));

    }

    return <>
    <Authenticated
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            
        </h2>
    }
    >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>ID</th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>IMAGE</th>
                                        <th onClick={e=>sortChanged('name')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'name' ? 'bg-gray-950 ' : "")}>NAME</th>
                                        <th onClick={e=>sortChanged('description')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'description' ? 'bg-gray-950 ' : "")}>DESCRIPTION</th>
                                        <th  className={"px-3 py-3 hover:cursor-pointer "}>STATUS</th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>PRIORITI</th>
                                        <th onClick={e=>sortChanged('created_at')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'created_at' ? 'bg-gray-950 ' : "")}>CREATED AT</th>
                                        <th onClick={e=>sortChanged('updated_at')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'updated_at' ? 'bg-gray-950 ' : "")}>UPDATED AT</th>
                                        <th onClick={e=>sortChanged('due_date')} className={"px-3 py-3 hover:cursor-pointer " + (queryParams.sort_field == 'due_date' ? 'bg-gray-950 ' : "")}>DUE DATE</th>
                                    
                                    </tr>
                                    
                                </thead>
                                <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                        <th  colspan="2" className={"text-md px-3 py-3 hover:cursor-pointer "}>{tasks.data[0].project.name}</th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>
                                                
                                                <TextInput defaultValue={queryParams.name} onBlur={e=>searchFieldChanged('name',e.target.value)}  onKeyPress={e=>onKeyPress('name',e)} title='Enter task name' className="w-full"/>
                                        </th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>
                                            <TextInput defaultValue={queryParams.description} onBlur={e=>searchFieldChanged('description',e.target.value,)} onKeyPress={e=>onKeyPress('description',e)} title='Enter task descritption' className="w-full"/>
                                        </th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>
                                            <SelectInput onChange={e=>searchFieldChanged('status',e.target.value)} defaultValue={queryParams.status}>
                                                <option value="">All</option>
                                                <option value="completed">Completed</option>
                                                <option value="in_progres">In Progress</option>
                                                <option value="pending">Pending</option>
                                            </SelectInput>
                                        </th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}>
                                        <SelectInput onChange={e=>searchFieldChanged('priority',e.target.value)} defaultValue={queryParams.priority}>
                                                <option value="">All</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </SelectInput>
                                        </th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}></th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}></th>
                                        <th className={"px-3 py-3 hover:cursor-pointer "}></th>
                                    
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {tasks.data.map((task,ind)=>(
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={ind}>
                                                <td className="px-3 py-2">
                                                    {task.id}
                                                </td>
                                                
                                                <td className="px-3 py-2">
                                                    <img src={task.image_path} alt="image" style={{width:60}}/>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.description}
                                                </td>
                                                <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]
                                                    }>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded text-white "
                                                        + TASK_PRIORITY_CLASS_MAP[task.priority]
                                                    }>
                                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.created_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.updated_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.due_date}
                                                </td>
                                                <td>

                                                </td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                        </div>
                       
                       <Pagination links={tasks.meta.links} />

                    </div>
                </div>
            </div>
        </div>
    </Authenticated>
</>
}

export default Tasks;