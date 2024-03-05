"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {useRouter} from "next/navigation"
import { formSchema } from "@/schema/page"


const page = () => {
 
  const router= useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: 'male',
      dateOfBirth: "",
      contactNumber: '',
    },
    
  })
   // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //i wanna  check the errors and if there are none i wanna push to home page
    if (Object.keys(form.formState.errors).length === 0) {

      const dateObject = new Date(values.dateOfBirth);
      const apiUrl = 'http://localhost:8080/fhir/Patient';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resourceType: 'Patient',
            name: [{ given: values.firstName, family: values.lastName }],
            gender: values.gender,
            birthDate: values.dateOfBirth,
            telecom: [{ system: 'phone', value: values.contactNumber }],
          }),
        });
    
        if (response.ok) {
          router.push("/")
          console.log('Patient data submitted successfully!');
          // Handle success logic here
        } else {
          console.log(response.body)
          console.error('Failed to submit patient data:', response.status, response.statusText);
          // Handle error logic here
        }
      } catch (error) {
        console.error('Error during patient data submission:', error);
        // Handle error logic here
      }
      
      
    }
  }

  return (
    <div className=" flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-black">
      <div className="w-[460px] h-[660px] bg-gradient-to-r from-blue-900 to-blue-800 p-4 rounded-3xl flex flex-col items-center justify-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className=" font-bold pl-2 pt-4 text-[24px]">Enter Your Details</div>
          <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input type="name" placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
        
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl className="flex flex-col">
                <Input
                  placeholder="shadcn"
                  {...field}
                  type="date"
                  id="birthday"
                  className="rounded-sm w-[240px] h-[40px]"
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
      <Button type="submit" >Submit</Button>
      </form>
    </Form>
    </div>
    </div>
  )
}
export default page