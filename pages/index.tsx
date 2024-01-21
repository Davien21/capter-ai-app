import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Header, Footer } from "components";
import styles from "./home-page.module.scss";
import { GenerateTweet, GetAuthUrl, PostTweet } from "services/twitterService";
import { feministTweets, productivityTweets } from "data/dummy";
import { toast } from "sonner";

interface IFormInput {
  topic?: string;
  tweet1?: string;
  tweet2?: string;
  tweet3?: string;
  tweet4?: string;
  tweet5?: string;
  tweet6?: string;
  tweet7?: string;
  tweet8?: string;
  tweet9?: string;
  tweet10?: string;
}

const schema = yup
  .object({
    topic: yup.string(),
    tweet1: yup.string(),
    tweet2: yup.string(),
    tweet3: yup.string(),
    tweet4: yup.string(),
    tweet5: yup.string(),
    tweet6: yup.string(),
    tweet7: yup.string(),
    tweet8: yup.string(),
    tweet9: yup.string(),
    tweet10: yup.string(),
  })
  .required();

export default function Index() {
  const [generatedTweet, setgeneratedTweet] = useState("");
  const [currentSample, setCurrentSample] = useState(productivityTweets);
  const [isLoading, setisLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Welcome to Capter.ai",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      topic: currentSample.topic,
      tweet1: currentSample.tweets[0],
      tweet2: currentSample.tweets[1],
      tweet3: currentSample.tweets[2],
      tweet4: currentSample.tweets[3],
      tweet5: currentSample.tweets[4],
      tweet6: currentSample.tweets[5],
      tweet7: currentSample.tweets[6],
      tweet8: currentSample.tweets[7],
      tweet9: currentSample.tweets[8],
      tweet10: currentSample.tweets[9],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const allTweets = [
        data.tweet1,
        data.tweet2,
        data.tweet3,
        data.tweet4,
        data.tweet5,
        data.tweet6,
        data.tweet7,
        data.tweet8,
        data.tweet9,
        data.tweet10,
      ];

      let allTweetsSeparated = ``;
      allTweets.forEach((tweet, index) => {
        allTweetsSeparated += `${index + 1}. ${tweet}`;
      });

      const withoutTopicPrompt = `Examine the following sample tweets, each separated by numbers, to discern the predominant style, tone, and characteristics. Look for patterns in length (short-form or long-form), tone (playful or serious), and the usage of any slangs, noting their possible origins. Based on this analysis, craft a new tweet that aligns with these identified aspects. If a common subject or theme is evident in the samples, let that guide the content of the new tweet.
      
      Focus on replicating the original writer's style and tone from these samples. The goal is to create a tweet that could believably be from the same author, without explaining your analytical process.
    
      Sample tweets: 
      ${allTweetsSeparated}
    
      The new tweet should authentically reflect the essence and style of the original tweets, maintaining the same level of creativity and authenticity as the author's own writing.`;

      const withTopicPrompt = `Analyze the style, tone, and characteristics of the following sample tweets, each separated by numbers. Identify key aspects such as whether they are mostly short-form or long-form, playful or serious in tone. Note any recurring slangs, and if present, deduce their origin (e.g., country or region). After analyzing, create a new tweet on the topic "${data.topic}" that closely mirrors the identified style, tone, and use of slangs. Aim for a similar length—short-form or long-form—based on the majority pattern in the samples. 
        
      It's crucial that the new tweet authentically reflects the original writer's voice from these samples. This task is of utmost importance, so please focus solely on crafting the tweet in the same style without explaining the process or reasoning. 
    
      Here are the sample tweets: 
      ${allTweetsSeparated}
      
      Ensure the new tweet captures the essence and style of these samples accurately, as if it were written by the original author themselves.`;

      const newMessages = [
        ...messages,
        {
          role: "user",
          content: data.topic ? withTopicPrompt : withoutTopicPrompt,
        },
      ];
      setMessages(newMessages);
      // console.log(newMessages);
      setisLoading(true);
      const result = await GenerateTweet({ messages: newMessages });
      const generatedTweet = result.data.data.tweet;
      setgeneratedTweet(generatedTweet);
      console.log({ generatedTweet });
    } catch (error) {
      console.error("Error generating tweets:", error);
    } finally {
      setisLoading(false);
    }
  };

  const handlePostTweet = async () => {
    try {
      setIsPosting(true);
      // await PostTweet({ tweet: generatedTweet });
      await GetAuthUrl();
    } catch (error) {
      toast.error("Error posting tweet");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    // This useEffect could be used for additional side-effects or data fetching
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`${styles["container"]} flex-1`}>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-[800px] m-auto gap-5"
          >
            <input {...register("topic")} placeholder="Enter a topic" />
            <p>{errors.topic?.message}</p>
            <div className="grid grid-cols-3 gap-4">
              <textarea
                {...register("tweet1")}
                placeholder="Enter tweet 1"
                rows={3}
              />
              <textarea
                {...register("tweet2")}
                placeholder="Enter tweet 2"
                rows={3}
              />
              <textarea
                {...register("tweet3")}
                placeholder="Enter tweet 3"
                rows={3}
              />
              <textarea
                {...register("tweet4")}
                placeholder="Enter tweet 4"
                rows={3}
              />
              <textarea
                {...register("tweet5")}
                placeholder="Enter tweet 5"
                rows={3}
              />
              <textarea
                {...register("tweet6")}
                placeholder="Enter tweet 6"
                rows={3}
              />
              <textarea
                {...register("tweet7")}
                placeholder="Enter tweet 7"
                rows={3}
              />
              <textarea
                {...register("tweet8")}
                placeholder="Enter tweet 8"
                rows={3}
              />
              <textarea
                {...register("tweet9")}
                placeholder="Enter tweet 9"
                rows={3}
              />
              <textarea
                {...register("tweet10")}
                placeholder="Enter tweet 10"
                rows={3}
              />
            </div>

            <button type="submit">
              {isLoading ? "Loading" : "Generate Tweet"}
            </button>
          </form>
          {generatedTweet && (
            <div className="max-w-[800px] mx-auto mt-2">
              <p className="text-center">Generated Tweet:</p>
              <p>{generatedTweet}</p>
              <button
                type="submit"
                className="mt-4 p-[1rem!important]"
                onClick={handlePostTweet}
              >
                {isPosting ? "Loading" : "Post Tweet"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
