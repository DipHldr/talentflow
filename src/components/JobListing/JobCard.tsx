import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Job } from "../../mocks/types/jobs.ts";

import { Button } from '../ui/button';
const JobCard = ({id,title,description,company,location,salary,status,tags,postedAt}:Job) => {
//     const job={
//     id: 1,
//     title: "Frontend Developer",
//     description: "Join our dynamic frontend team to build responsive and accessible web applications using React. Collaborate with designers and backend developers to deliver engaging user experiences.",
//     company: "TechCorp",
//     location: "Bangalore",
//     salary: "₹50k-70k",
//     status: "open",
//     tags: ["React", "TypeScript", "UI"],
//     postedAt: "2025-09-01T10:00:00Z",
//   };

  return (
    <Card className='bg-gradient-to-tl from-purple-100 via-indigo-100 to-blue-200 rounded-xl shadow-lg'>
        <CardHeader>
            <CardTitle className='font-[636] font-s'>{title}</CardTitle>
            <CardDescription className='font-serif font[500]'>{description}</CardDescription>
            
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Compensation:</span>
                <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-sm font-semibold">
                    {salary}
                </span>
            </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
            <div className='flex space-x-1'>
            {tags.map((val:String)=>{
                return <span key={id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-gray-900 dark:text-gray-200">{val}</span>

                // return <p key={index} className='bg-slate-300 p-1 rounded-2xl'>{val}</p>
            })}
            </div>

            <Button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-8 py-4 text-center me-2 mb-2  text-md font-serif text-lg shadow-md'>Apply</Button>
            
        </CardFooter>
    </Card>
  )
}

export default JobCard;
