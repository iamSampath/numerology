//Author: Sampath Kumar Medarametla
$(function () {
    $("#dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1800:" + new Date().getFullYear()
    });
});

function checkDOB() {
    const dobInput = $("#dob").val();
    const dobParts = dobInput.split("/");
    const genderInput = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    const name = $("#name").val();


    if (dobParts.length !== 3) {
        document.getElementById("results").innerHTML = "<div class='alert alert-danger'>Invalid Date Format!!</div>";
        return;
    }

    //Name empty validation
    if (name === null || name === "") {
        document.getElementById("results").innerHTML = "<div class='alert alert-danger'>Name cannot be empty!!</div>" + name;
        return;
    }

    const nameOfPerson = name;
    const day = parseInt(dobParts[1]);
    const month = parseInt(dobParts[0]);
    const year = parseInt(dobParts[2]);

    // Basic validation (can be more robust)
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1800 || year > new Date().getFullYear()) {
        document.getElementById("result").innerHTML = "<div class='alert alert-danger'>Invalid Date of birth!!</div>";
        return;
    }

    // Calculate Kua Number
    let yearSingleDigit = year;
    while (yearSingleDigit > 9) {
        yearSingleDigit = yearSingleDigit.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    let kuaNumber;
    if (genderInput === "male") {
        kuaNumber = 11 - yearSingleDigit;
        while (kuaNumber > 9) {
            kuaNumber = kuaNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
    } else {
        kuaNumber = yearSingleDigit + 4;
        while (kuaNumber > 9) {
            kuaNumber = kuaNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
    }

    // Calculate Life Path Number
    let lifePathNumber = day + month + year;
    while (lifePathNumber > 9) {
        lifePathNumber = lifePathNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    // Calculate Driver Number
    let driverNumber = day;
    while (driverNumber > 9) {
        driverNumber = driverNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    // Separate digits into arrays
    const allDigits = [...day.toString().split('').filter(digit => digit !== '0'),
    ...month.toString().split('').filter(digit => digit !== '0'),
    ...year.toString().split('').filter(digit => digit !== '0'),
    ...kuaNumber.toString().split('').filter(digit => digit !== '0'),
    ...lifePathNumber.toString().split('').filter(digit => digit !== '0'),
    ...driverNumber.toString().split('').filter(digit => digit !== '0')];


    // Create the Loshu Grid as a 2D string array
    const loshuGrid = [
        ["4", "9", "2"],
        ["3", "5", "7"],
        ["8", "1", "6"]
    ];

    // Compare and create a new grid with matched digits
    const comparedGrid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const matchingNumbers = [];
    const nonMatchingNumbers = [];

    const kuaNumberPicks = [

        {
            number: 1,
            ref: "Ambitious Innovator",
            dir: "North",
            element: "water",
            traits: "Ambitious, intelligent, and intuitive, thrive in environments where you can innovate and take the lead."
        },
        {
            number: 2,
            ref: "Nurturing Caregiver",
            dir: "South-West",
            element: "Earth",
            traits: "You are caring, supportive, and practical, finding joy in helping others and fostering a peaceful environment."
        },
        {
            number: 3,
            ref: "Energetic Pioneer",
            dir: "East",
            element: "Wood",
            traits: "Energetic and creative, individuals with Kua number 3 are passionate about growth and new experiences. You thrive in environments that challenge you and push you to evolve."
        },
        {
            number: 4,
            ref: "Adaptable Diplomat",
            dir: "South-East",
            element: "Wood",
            traits: "Adaptable and resourceful, individuals with Kua number 4 excel in diplomacy and negotiation. You thrive in collaborative environments and are skilled at working within teams."
        },
        {
            number: 5,
            ref: "Balanced Center",
            dir: "North-East(M) & South-West(F)",
            element: "Earth",
            traits: "Balanced and stable, possessing a natural ability to remain grounded and centered, regardless of the situation."
        },
        {
            number: 6,
            ref: "Strong Leader",
            dir: "North-West",
            element: "Metal",
            traits: "Strength, authority, and discipline, individuals with Kua number 6 are natural leaders. You are dependable and take control in any situation."
        },
        {
            number: 7,
            ref: "Joyful Creator",
            dir: "West",
            element: "Metal",
            traits: "Sociable,joyful, and artistic, individuals with Kua number 7 have a unique ability to connect with others through their creative energy."
        },
        {
            number: 8,
            ref: "Determined Analyst",
            dir: "North-East",
            element: "Earth",
            traits: "Individuals with Kua number 8 excel in environments that demand strong determination, discipline, and analytical skills."
        },
        {
            number: 9,
            ref: "Passionate Visionary",
            dir: "South",
            element: "Fire",
            traits: "Passionate, charismatic, and visionary, individuals with Kua number 9 are driven by their goals and inspire others with their contagious enthusiasm."
        },
    ];

    const conductorNumberPicks = [
        {
            number: 1,
            ref: "Leader",
            desc: "Having a Conductor Number of 1 means you're a natural leader who often takes charge and sets the direction for others. While you can sometimes come across as bossy or stubborn, you also display patience when needed. Your strong sense of independence, determination, and self-assurance drives you to pursue your ambitions with confidence and respect for your role in society.\n\nYour ability to lead and innovate is truly remarkable. You thrive in positions where you can take initiative, inspire others, and bring new ideas to life. Your leadership qualities make you stand out and leave a lasting impact wherever you go."
        },
        {
            number: 2,
            ref: "Peacemaker",
            desc: "Having a Conductor Number of 2 means you are a natural mediator, skilled at bringing people together and finding harmony. You excel at viewing situations from multiple perspectives, which makes you an excellent problem solver. Your kindness and empathy allow you to connect with others on a deep level, fostering trust and collaboration.\n\nHowever, you may sometimes find it challenging to make decisions or avoid conflicts, as you prefer maintaining peace. Your supportive and helpful nature makes you a loyal companion and a reliable friend. You thrive in environments where collective effort and teamwork are valued, as they align perfectly with your harmonious and cooperative spirit."
        }, {
            number: 3,
            ref: "Creative Genius",
            desc: "Having Conductor Number of 3 means, your path is filled with creativity and excitement. At heart, you're an artist who passionately enjoys what you do. You excel in communication, sharing ideas, and entertaining others. While you might occasionally feel disorganized or down, your positive attitude always helps you recover quickly.\n\nYou excel in roles that involve engaging with others and allowing you to express yourself authentically. Your cheerful demeanor and approachable nature bring energy to those around you, making you a natural at lifting spirits and creating a lively, vibrant environment."
        },
        {
            number: 4,
            ref: "Builder",
            desc: "If your Conductor Number is 4, you are defined by stability and practicality. You are reliable and diligent, always ensuring that a solid foundation is established in everything you do. Adapting to new environments can be challenging for you, as you tend to prefer the security and familiarity of the status quo. However, your exceptional organizational skills and attention to detail make you someone others can always rely on.\n\nYou thrive in environments that require careful planning, structure, and consistency, where your methodical approach ensures success and reliability."
        },
        {
            number: 5,
            ref: "Adventurer",
            desc: "You have a deep love for freedom and adventure, always eager to embrace change and new experiences. Your natural curiosity pushes you to explore the world around you. While you can sometimes be impulsive and struggle with commitment, your vibrant energy and versatility make you a fun and dynamic presence. You thrive in environments that offer variety, excitement, and the chance to discover something new."
        }, {
            number: 6,
            ref: "Nurturer",
            desc: "Those with a Conductor Number of 6 are compassionate and responsible, always thinking of others with a big heart. However, you may sometimes find yourself being overly controlling or anxious about others, struggling to trust them to handle things. Despite this, your loyalty and protective nature make you an exceptional caregiver. You excel in roles that require nurturing, helping, and supporting others, where your caring instincts truly shine."
        }, {
            number: 7,
            ref: "Seeker",
            desc: "For those with a Conductor Number of 7, life is a path of discovery and introspection. You are thoughtful and enjoy exploring profound ideas. Trusting others can be a challenge, and you may tend to be more reserved. However, your deep wisdom and strong intuition make you a reflective and insightful thinker. You thrive in roles that demand analysis, problem-solving, and quiet contemplation."
        },
        {
            number: 8,
            ref: "Powerhouse",
            desc: "Ambition and strength define those with a Conductor Number of 8. You are highly driven to succeed and possess a natural ability to influence others. At times, you may become overly focused on material success and control. However, your confidence and resourcefulness make you an effective and resilient leader. You thrive in leadership positions where your achievements are recognized and rewarded."
        }, {
            number: 9,
            ref: "Humanitarian",
            desc: "With a Conductor Number of 9, you are deeply generous and compassionate, driven by a strong desire to make the world a kinder place for everyone. Your dreams are often grand and ambitious, sometimes detaching you from reality. However, your kindness and open-mindedness have the potential to create meaningful change in the world. You excel in roles that allow you to help others, where your efforts can both elevate your community and bring about positive transformation."
        },

    ];

    const driverNumberPicks = [
        {
            number: 1,
            ref: "Independence and Leadership",
            desc: "You are a natural-born leader, possessing strength, confidence, and a strong desire to take charge. You excel at initiating projects and guiding others, often taking the first step and leading by example. Your decisiveness and responsibility make you a valuable asset in any team.However, your strong-willed nature can sometimes manifest as bossiness or stubbornness. To enhance your leadership, it's crucial to cultivate empathy and flexibility. Listen actively to others' perspectives, consider their ideas, and foster a collaborative environment. By embracing teamwork, you can achieve even greater success."
        },
        {
            number: 2,
            ref: "Harmony and Cooperation",
            desc: "You have a natural affinity for connecting with others and thrive in collaborative environments. Your ability to understand people and foster harmony makes you the glue that holds groups together. You listen attentively and instinctively find ways to ensure everyone feels valued and content.\n\nHowever, there are times when decision-making may pose a challenge, stemming from your strong desire to maintain harmony and avoid conflict. This can happen because you place considerable importance on others' opinions, sometimes at the expense of your own clarity. Developing a more assertive approach and confidently expressing your thoughts can be beneficial. While kindness is a strength, balance is essential, and standing firm in your convictions when needed is equally vital."
        },
        {
            number: 3,
            ref: "Creativity and Optimism",
            desc: "you are a beacon of creativity and optimism. Your vivid imagination and positive perspective bring light and joy to every situation. You naturally inspire others with your innovative ideas, whether through art, writing, or inventing engaging activities.\n\nHowever, your boundless creative energy can sometimes lead to being scattered, causing you to start multiple projects without completing them. Additionally, your strong sense of optimism might lead you to overlook the importance of detailed planning, assuming things will naturally fall into place. By cultivating focus and learning to structure your ideas thoughtfully, you can harness your creativity more effectively and turn your visions into reality."
        },
        {
            number: 4,
            ref: "Stability and Responsibility",
            desc: " you are like a superhero of stability and responsibility! People trust you deeply because they know they can count on you to handle things perfectly and with great attention to detail. You take pride in doing things right and often prefer following a consistent pattern in life, avoiding surprises and embracing routine.\n\nHowever, having a Driver Number of 4 can sometimes mean you become too attached to the status quo, resisting change at all costs. While your love for stability is admirable, it’s essential to cultivate adaptability and remain open to alternative approaches. Embracing flexibility can help you grow while still honoring your natural sense of order and dependability."

        },
        {
            number: 5,
            ref: "Freedom and Adventure",
            desc: "You're a true enthusiast of freedom and fun! Your boundless curiosity and adventurous spirit make life an exciting journey. You thrive on exploring new places, meeting interesting people, and discovering fascinating things. Your zest for life brings energy and excitement wherever you go.\n\nHowever, your impulsive nature can sometimes lead to hasty decisions or risks taken without fully considering the consequences. Striking a balance between embracing spontaneity and practicing thoughtful planning helps ensure your adventures are both safe and enjoyable. Being bold and adventurous is amazing, but staying mindful and prepared makes the journey even better!"

        }, {
            number: 6,
            ref: "Harmony and Balance",
            desc: "You have a remarkable talent for creating harmony and balance in your surroundings. Your caring and responsible nature drives you to look out for the well-being of others, bringing light and joy to those around you. Whether it's nurturing pets, tending to plants, or supporting friends and family, you find happiness in helping and spreading positivity.\n\nHowever, your generous spirit can sometimes lead you to overextend yourself, neglecting your own needs. This may leave you feeling anxious or drained. It's important to set healthy boundaries and practice saying no when necessary, ensuring you have time to recharge. Remember, caring for yourself enables you to continue caring for others effectively and joyfully."

        },
        {
            number: 7,
            ref: "Wisdom and Introspection",
            desc: "You are a deep thinker, constantly seeking wisdom and exploring life's profound meanings. You enjoy immersing yourself in reading, learning, and solving complex puzzles, often finding peace in moments of solitude for reflection. Your thoughtful nature allows you to make wise decisions and gain meaningful insights that others admire.\n\nHowever, your introspective tendencies can sometimes make you overly critical of yourself or others, and your love for solitude may create a sense of distance in relationships. Striking a balance by connecting more with people and sharing your thoughts can strengthen your bonds. Being a deep thinker is a wonderful gift, but fostering connections with others is equally essential for a fulfilling life."
        }, {
            number: 8,
            ref: "Achievement and Ambition",
            desc: "You are an ambitious and determined individual who works tirelessly to achieve your dreams and succeed in life. Your unwavering focus and ability to keep pushing forward, even when faced with challenges, set you apart. You never give up because you firmly believe in your ability to reach your goals, no matter the odds. Others admire your dedication and see you as a natural leader, with your numerous achievements standing as a testament to your hard work.\n\nFor those with a Driver Number 8, there may be a strong emphasis on acquiring possessions, sometimes even more than pursuing prestigious titles. However, true success lies in balancing ambition with compassion. By considering the needs of others and pairing your hard work with kindness, you can achieve not only personal success but also the joy of helping others thrive. Success feels even greater when it's shared."
        },
        {
            number: 9,
            ref: "Compassion and Humanitarianism",
            desc: "You are a deeply compassionate and generous individual who finds joy in helping others and making a positive impact. Whether it's volunteering, supporting friends, or standing up for what’s right, your big heart and selflessness inspire and uplift those around you, making you a true hero in their eyes.\n\nHowever, your dedication to others can sometimes lead you to neglect your own well-being. When you're constantly focused on helping others, it’s easy to become exhausted or overwhelmed. Remember, taking care of yourself is just as important as caring for others. Allow yourself time to rest and address your own needs. Helping others is a noble pursuit, but balancing it with self-care ensures you can continue to give your best to the world."

        }];



    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const gridNumber = loshuGrid[i][j];
            const digitIndices = allDigits.reduce((acc, num, index) => {
                if (num === gridNumber) {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (digitIndices.length > 0) {
                comparedGrid[i][j] = digitIndices.map(index => allDigits[index]).join('');
                digitIndices.forEach(index => allDigits.splice(index, 1));
                matchingNumbers.push(...digitIndices);
            } else {
                nonMatchingNumbers.push(gridNumber);
            }
        }
    }

    // Display the Numbers
    const numberDiv = document.getElementById("numbers");
    numberDiv.innerHTML = `
      <div class="container mt-2"> 
        <h4 class="lfalign">Key Numbers:</h4>
        <div class="row justify-content-center mt-3">
            <div class="col-md-6">
                <table class="table table-dark table-bordered table-hover">
                <tr>
                  <td class="lfalign">Aspect</td>
                  <td class="lfalign">Result</td>
                  <td class="lfalign">Interpretation</td>
                </tr>
                <tr>
                  <td class="lfalign">Conductor/Lifepath Number</td>
                  <td class="lfalign">${lifePathNumber}</td>
                  <td class="lfalign">${conductorNumberPicks[lifePathNumber-1].ref}</td>
                </tr>
                <tr>
                  <td class="lfalign">Driver Number</td>
                  <td class="lfalign">${driverNumber}</td>
                  <td class="lfalign">${driverNumberPicks[driverNumber-1].ref}</td>
                </tr>
                <tr>
                  <td  class="lfalign">Kua Number</td>
                  <td  class="lfalign">${kuaNumber}</td>
                  <td  class="lfalign">${kuaNumberPicks[kuaNumber-1].ref}</td>
                </tr>
                </table>
            </div>
        </div>
        
        <h4 class="lfalign">Your Number Insights:</h4>
        <div class="row lfalign mt-3">
            <div class="col-md-12">
                <p class="lfalign size20"><b>According your lifepath number:</b> ${conductorNumberPicks[lifePathNumber-1].desc}</p>
                <p class="lfalign size20"><b>According your Driver number:</b> ${driverNumberPicks[driverNumber-1].desc}</p>
                <p class="lfalign size20"><b>According your Kua number:</b> ${kuaNumberPicks[kuaNumber-1].traits}</p>
            </div>
        </div>
      </div>
    `;

    // Display the Birthchart
    const resultsDiv = document.getElementById("charts");
    resultsDiv.innerHTML = `
    <hr class="my-4">
    <div class="container mt-2">
     <h4 align="center">${dobInput}</h4>
     <h4 align="center">${nameOfPerson}</h4>
     <h4 align="center">Birth Chart:</h4>
     <div class="row justify-content-center mt-3">
        <div class="col-md-6">
            <table class="table table-dark table-bordered table-hover text-center">
                <tr>
                    <td>${comparedGrid[0][0]}</td>
                    <td>${comparedGrid[0][1]}</td>
                    <td>${comparedGrid[0][2]}</td>
                </tr>
                <tr>
                    <td>${comparedGrid[1][0]}</td>
                    <td>${comparedGrid[1][1]}</td>
                    <td>${comparedGrid[1][2]}</td>
                </tr>
                <tr>
                    <td>${comparedGrid[2][0]}</td>
                    <td>${comparedGrid[2][1]}</td>
                    <td>${comparedGrid[2][2]}</td>
                </tr>
            </table>
        </div>
     </div>    
    </div>    
    `;

    const lgrid = document.getElementById("lgrid");
    lgrid.innerHTML = `
    <div class="container mt-2 md-2">
     <h4 style="text-align: left;">Loshu Grid</h4>
     <p class="mt-3 size20">The Loshu Grid, also known as the Magic Square, is a powerful tool in numerology.
        It's a 3x3 grid filled with numbers 1 to 9, arranged in such a way that the sum of each row, column, and diagonal equals the same number, 15. 
        This ancient Chinese grid is believed to hold profound significance in understanding the energies and patterns that shape our lives.
        <br><br>By analyzing the numbers in a birth date or name, one can map them onto the Loshu Grid.
        Each number corresponds to a specific energy and vibration. By understanding the interplay of these energies,
        insights can be gained into personality traits, life paths, and potential challenges and opportunities.
     </p>
     <div class="row justify-content-center mt-3">
        <div class="col-md-6">
            <table class="table table-dark table-bordered table-hover"> 
                <tr>
                    <td>4</td>
                    <td>9</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>5</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>1</td>
                    <td>6</td>
                </tr>
            </table>
        </div> 
        
   </div>
   </div>
   
   <div class="container mt-5">
     <div class="row justify-content-center mt-3">
        <div class="col-md-6">
            <table class="table table-dark table-bordered table-hover"> 
                <tr>   
                    <td style="text-align: left;">Number</td>
                    <td style="text-align: left;">Planet</td>
                    <td style="text-align: left;">Represents</td>

                </tr>
                <tr>
                    <td style="text-align: left;">1</td>
                    <td style="text-align: left;">Sun</td>
                    <td style="text-align: left;">Leadership</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">2</td>
                    <td style="text-align: left;">Moon</td>
                    <td style="text-align: left;">Sensitivity and Intution</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">3</td>
                    <td style="text-align: left;">Jupiter</td>
                    <td style="text-align: left;">Knowledge & Education</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">4</td>
                    <td style="text-align: left;">Rahu/Uranus</td>
                    <td style="text-align: left;">Discipline and Organization</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">5</td>
                    <td style="text-align: left;">Mercury</td>
                    <td style="text-align: left;">Balance in life</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">6</td>
                    <td style="text-align: left;">Venus</td>
                    <td style="text-align: left;">Money and Career</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">7</td>
                    <td style="text-align: left;">Neptune</td>
                    <td style="text-align: left;">Wisdom</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">8</td>
                    <td style="text-align: left;">Saturn</td>
                    <td style="text-align: left;">Financial Management</td>
                    
                </tr>
                <tr>
                    <td style="text-align: left;">9</td>
                    <td style="text-align: left;">Mars</td>
                    <td style="text-align: left;">Intelligence</td>
                    
                </tr>
            </table>
        </div> 
        
   </div>
   </div>`;

}
