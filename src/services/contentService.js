// Content generation service
// This can be replaced with actual AI API calls (OpenAI, etc.)

export const contentService = {
  // Generate content based on topic, platform, and content type
  async generateContent(topic, platform, contentType) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = this.getContentTemplates();
    const template = templates[platform]?.[contentType] || templates.instagram.post;
    
    return {
      caption: this.generateCaption(topic, template, platform),
      hashtags: this.generateHashtags(topic, platform),
      imagePrompt: this.generateImagePrompt(topic, platform, contentType),
      platform,
      contentType,
      generatedAt: new Date().toISOString()
    };
  },

  // Content templates for different platforms and types
  getContentTemplates() {
    return {
      instagram: {
        post: {
          structure: [
            "🌟 [Hook about topic]",
            "",
            "✨ [Benefit 1]",
            "✨ [Benefit 2]", 
            "✨ [Benefit 3]",
            "",
            "[Call to action question]",
            "",
            "[Hashtags]"
          ],
          maxLength: 2200
        },
        story: {
          structure: [
            "Quick tip about [topic]! 💡",
            "",
            "Swipe up to learn more! ⬆️"
          ],
          maxLength: 500
        },
        reel: {
          structure: [
            "🎥 [Topic] in 30 seconds!",
            "",
            "Save this for later! 📌",
            "",
            "[Quick tip or hook]"
          ],
          maxLength: 1000
        }
      },
      facebook: {
        post: {
          structure: [
            "[Engaging question or statement about topic]",
            "",
            "[Detailed explanation with benefits]",
            "",
            "[Personal experience or story]",
            "",
            "[Call to action]"
          ],
          maxLength: 5000
        }
      }
    };
  },

  // Generate caption based on topic and template
  generateCaption(topic, template, platform) {
    const captions = {
      classroom_management: {
        instagram: `🌟 Transform your classroom with these ${topic} strategies!\n\n✨ Creates a positive learning environment\n✨ Reduces disruptions and increases focus\n✨ Builds mutual respect between teacher and students\n✨ Helps students develop self-regulation skills\n\nWhat's your go-to classroom management technique? Share below! 👇\n\n#TeacherLife #ClassroomManagement #Education`,
        facebook: `Fellow educators! Let's talk about ${topic} - one of the most crucial skills we need as teachers.\n\nAfter years in the classroom, I've learned that effective classroom management isn't about being strict or controlling. It's about creating an environment where learning can flourish.\n\nHere are some strategies that have worked wonders in my classroom:\n• Setting clear, consistent expectations from day one\n• Building relationships with each student\n• Using positive reinforcement over punishment\n• Creating engaging lessons that minimize off-task behavior\n\nRemember, every classroom is different, and what works for one teacher might need tweaking for another. The key is finding your style while maintaining a focus on student success.\n\nWhat classroom management strategies have you found most effective? I'd love to hear your experiences!`
      },
      stem_activities: {
        instagram: `🔬 STEM doesn't have to be intimidating! Here's why ${topic} should be part of every classroom:\n\n✨ Develops critical thinking skills\n✨ Encourages hands-on learning\n✨ Prepares students for future careers\n✨ Makes learning fun and engaging\n\nTry this simple activity: [specific STEM activity related to topic]\n\nWhat's your favorite STEM activity? Tag a teacher friend! 👩‍🔬👨‍🔬`,
        facebook: `STEM education is more important than ever, and ${topic} is a fantastic way to get students excited about science, technology, engineering, and math!\n\nI love incorporating STEM activities because they:\n• Encourage problem-solving and creativity\n• Show real-world applications of academic concepts\n• Build confidence in students who might think they're "not good at math or science"\n• Prepare students for an increasingly tech-focused world\n\nOne of my favorite activities is [detailed activity description]. The students are always amazed when they see the results!\n\nRemember, STEM doesn't require expensive equipment. Some of the best activities use everyday materials and focus on the process of inquiry and discovery.\n\nWhat STEM activities have your students enjoyed most?`
      }
    };

    // Normalize topic for lookup
    const normalizedTopic = topic.toLowerCase().replace(/\s+/g, '_');
    
    // Return specific caption if available, otherwise generate generic one
    if (captions[normalizedTopic] && captions[normalizedTopic][platform]) {
      return captions[normalizedTopic][platform];
    }

    // Generic caption generation
    return this.generateGenericCaption(topic, platform);
  },

  generateGenericCaption(topic, platform) {
    const hooks = [
      `🌟 ${topic} can transform your teaching journey!`,
      `💡 Let's talk about ${topic} - here's why it matters:`,
      `✨ Discovering the power of ${topic} in education!`,
      `🎯 ${topic} made simple - your students will love this!`
    ];

    const benefits = [
      "Creates meaningful learning experiences",
      "Builds stronger student connections", 
      "Develops critical thinking skills",
      "Encourages creative problem-solving",
      "Increases student engagement",
      "Supports diverse learning styles"
    ];

    const callToActions = [
      `What's your experience with ${topic}? Share below! 👇`,
      `Try this approach and let me know how it goes! 💬`,
      `Tag a teacher friend who needs to see this! 👥`,
      `Save this post for your lesson planning! 📌`
    ];

    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    const selectedBenefits = benefits.sort(() => 0.5 - Math.random()).slice(0, 3);
    const cta = callToActions[Math.floor(Math.random() * callToActions.length)];

    if (platform === 'instagram') {
      return `${hook}\n\n${selectedBenefits.map(b => `✨ ${b}`).join('\n')}\n\n${cta}`;
    } else {
      return `${hook}\n\n${selectedBenefits.map(b => `• ${b}`).join('\n')}\n\n${cta}\n\nWhat strategies have worked best in your classroom? I'd love to hear your thoughts!`;
    }
  },

  // Generate relevant hashtags
  generateHashtags(topic, platform) {
    const baseHashtags = ['#TeacherLife', '#Education', '#Teaching', '#LearningTogether', '#EduChat'];
    const topicHashtags = [
      `#${topic.replace(/\s+/g, '')}`,
      '#TeachingTips',
      '#ClassroomInnovation',
      '#StudentEngagement',
      '#TeacherSupport'
    ];

    const platformSpecific = {
      instagram: ['#TeachersOfInstagram', '#EduInfluencer', '#TeachingCommunity'],
      facebook: ['#TeacherSupport', '#EducationMatters', '#TeachingLife']
    };

    return [
      ...baseHashtags,
      ...topicHashtags,
      ...(platformSpecific[platform] || [])
    ].slice(0, platform === 'instagram' ? 10 : 5);
  },

  // Generate image prompt for AI image generation
  generateImagePrompt(topic, platform, contentType) {
    const styles = [
      "vibrant and colorful",
      "modern and clean", 
      "warm and inviting",
      "professional yet friendly"
    ];

    const elements = [
      "classroom setting",
      "educational materials",
      "books and supplies",
      "teacher and students",
      "learning environment"
    ];

    const style = styles[Math.floor(Math.random() * styles.length)];
    const element = elements[Math.floor(Math.random() * elements.length)];

    return `Create a ${style} educational image featuring ${topic} in a ${element}. Include inspirational text overlay, modern design elements, and warm lighting. Perfect for ${platform} ${contentType}. High quality, professional, engaging for teachers and educators.`;
  },

  // Get content suggestions based on topic
  getContentSuggestions(topic) {
    const suggestions = {
      'classroom management': [
        'Setting classroom expectations',
        'Positive reinforcement strategies', 
        'Handling difficult behaviors',
        'Creating classroom routines'
      ],
      'stem activities': [
        'Simple science experiments',
        'Math games and puzzles',
        'Engineering challenges',
        'Technology integration'
      ],
      'teacher self-care': [
        'Work-life balance tips',
        'Stress management techniques',
        'Summer planning strategies',
        'Professional development'
      ]
    };

    return suggestions[topic.toLowerCase()] || [
      'Teaching strategies',
      'Student engagement',
      'Lesson planning',
      'Assessment ideas'
    ];
  }
};

export default contentService;
