package com.example.tanvi.ireport.Activity;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.example.tanvi.ireport.R;

import java.util.ArrayList;

public class MyReportActivity extends AppCompatActivity {

   ListView myReportsListView;
   ArrayList<String> reportsList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_report);
        myReportsListView = (ListView) findViewById(R.id.listViewReports);
        reportsList = new ArrayList<String>();
        getReports();
        ArrayAdapter<String> reportsArrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,reportsList);
        myReportsListView.setAdapter(reportsArrayAdapter);
       myReportsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
           @Override
           public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

               String selectedReport = reportsList.get(i);
               Toast.makeText(getApplicationContext(), "Report_Item Selected : "+selectedReport,Toast.LENGTH_SHORT).show();

           }
       });

    }

    private void getReports() {

        reportsList.add("Report_Item 1");
        reportsList.add("Report_Item 2");
        reportsList.add("Report_Item 3");
        reportsList.add("Report_Item 4");
        reportsList.add("Report_Item 5");
        reportsList.add("Report_Item 6");

    }
}
