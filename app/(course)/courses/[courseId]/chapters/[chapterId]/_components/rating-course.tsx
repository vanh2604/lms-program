"use client";

import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import ReactStars from "react-rating-stars-component";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface RatingCourseDialiogProps {
  courseId: string;
  isRated: any;
}
const RatingCourseDialiog = (props: RatingCourseDialiogProps) => {
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const ratingChanged = (newRating: any) => {
    setRate(newRating);
    console.log(props);
  };

  const rateCourse = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${props.courseId}/rating`, {
        rating: rate,
      });
      setIsLoading(false);
      setOpen(false);
      toast.success("Rate course successfully");
    } catch {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="w-full md:w-auto mr-2"
          disabled={props.isRated}
          title="You have rated this course"
        >
          {props.isRated ? "You have rated this course" : "Rate the course"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader onClick={() => setOpen(false)}>
          <DialogTitle>Rate the course</DialogTitle>
          <DialogDescription>
            Please give us your rating about the course
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <ReactStars count={5} size={24} activeColor="#ffd700" />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={rateCourse} disabled={isLoading}>
            Rate the course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingCourseDialiog;
