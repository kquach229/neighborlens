import React from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const ReviewForm = () => {
  return (
    <form
      action='
  '>
      <div>
        <Label>Rating</Label>
        <input id='rating' type='number' />
      </div>

      <div>
        <Label>Comment</Label>
        <Textarea
          id='comment'
          rows={5100}
          cols={5150}
          className='border p-2 w-full h-[10rem]'
        />
      </div>
    </form>
  );
};

export default ReviewForm;

// model Review {
//   id String @id @default(uuid())
//   rating Float
//   comment String?
//   biggestRisk String?
//   competitors String?
//   wouldIPayForThis String?
//   ideaId String
//   userId String
//   updatedAt DateTime @updatedAt
//   createdAt DateTime @default(now())

//   // Relations

//   idea Idea @relation(fields: [ideaId], references: [id])
//   user User @relation(fields: [userId], references: [id])
// }
