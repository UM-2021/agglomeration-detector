/***************************************************
   Infrared CO2 Sensor range : 400-4980ppm
 * ****************************************************
   This example The sensors detect CO2

   @author qsjhyy(qsj.huang@dfrobot.com)
   @version  V2.0
   @date  2021-8-17

   GNU Lesser General Public License.
   See <http://www.gnu.org/licenses/> for details.
   All above must be included in any redistribution
 * ****************************************************/
/*
  This example uses UNO to demonstrate.
  If you want to use other master controls, please configure the following two lines
*/
#define  sensorIn  3  // Sensor PWM interface

unsigned long pwm_high_start_ticks=0, pwm_high_end_ticks=0;
float pwm_high_val=0, pwm_low_val=0;
volatile uint8_t flag=0;
//int sensorIn = A0;

void interrupt_rising()
{
  pwm_high_start_ticks = micros();    // store the current micros() value
  if(2 == flag){
    flag = 4;
    pwm_low_val = pwm_high_start_ticks - pwm_high_end_ticks;
  }else{
    flag = 1;
  }

  attachInterrupt(digitalPinToInterrupt(sensorIn), interrupt_falling, FALLING);
}

void interrupt_falling()
{
  pwm_high_end_ticks = micros();    // store the current micros() value
  if(1 == flag){
    flag = 2;
    pwm_high_val = pwm_high_end_ticks - pwm_high_start_ticks;
  }

  attachInterrupt(digitalPinToInterrupt(sensorIn), interrupt_rising, RISING);
}


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(sensorIn, INPUT);
  attachInterrupt(digitalPinToInterrupt(sensorIn), interrupt_rising, RISING);
}


void loop() {
  if(flag == 4){
    flag = 1;
    float pwm_high_val_ms = (pwm_high_val * 1000) / (pwm_low_val + pwm_high_val);

    if (pwm_high_val_ms < 0.01){
      // Serial.println("Fault");
    } else if (pwm_high_val_ms < 80.00){
      // Serial.println("preheat");
    } else if (pwm_high_val_ms < 998.00) {
      float concentration = (pwm_high_val_ms - 2) * 5;
      // Print pwm_high_val_ms
      // Serial.print("pwm_high_val_ms:");
      // Serial.print(pwm_high_val_ms);
      // Serial.println("ms");

      //Print CO2 concentration
      Serial.println(concentration);
      // Serial.println("ppm");
    } else {
      // Serial.println("Beyond the maximum range ：398~4980ppm");
    }
    delay(2000);
  }
}
