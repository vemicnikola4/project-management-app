<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;


class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'created_at'=>(new Carbon($this->created_at))->format('Y-F-d'),
            'due_date'=>(new Carbon($this->due_date))->format('Y-F-d'),
            'status'=>$this->status,
            'image_path'=>$this->image_path,
            // 'createdBy'=>$this->createdBy,
            'createdBy'=>new UserResource($this->createdBy),
            'updatedBy'=>new UserResource($this->updatedBy),
            //this is gona return user object, i added belonsToOne in Project.php, but we need to modify it so it is not visible to font and. The entire user object
            // 'updatedBy'=>$this->updatedBy,
        ];
    }
}
